import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Renders an image with TRUE alpha transparency by removing background
 * and checkerboard artifacts client-side.
 */

type Props = {
  src: string;
  alt?: string;
  tolerance?: number; // 0..255, distance from background colors
  feather?: number;   // soft edge width
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
};

const cache = new Map<string, string>();

function distance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function collectBorderSamples(data: Uint8ClampedArray, w: number, h: number) {
  const samples: [number, number, number][] = [];
  const step = 2;
  const band = 8; // deeper border sampling to capture checker squares

  for (let y = 0; y < band; y++) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      samples.push([data[i], data[i + 1], data[i + 2]]);
      const j = ((h - 1 - y) * w + x) * 4;
      samples.push([data[j], data[j + 1], data[j + 2]]);
    }
  }
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < band; x++) {
      const i = (y * w + x) * 4;
      samples.push([data[i], data[i + 1], data[i + 2]]);
      const j = (y * w + (w - 1 - x)) * 4;
      samples.push([data[j], data[j + 1], data[j + 2]]);
    }
  }
  return samples;
}

function clusterBackground(samples: [number, number, number][], k = 6) {
  if (samples.length === 0) return [] as [number, number, number][];
  const centers: [number, number, number][] = [samples[0]];
  for (let s = 1; s < samples.length && centers.length < k; s++) {
    const p = samples[s];
    let minD = Infinity;
    for (const c of centers) {
      const d = distance(p[0], p[1], p[2], c[0], c[1], c[2]);
      if (d < minD) minD = d;
    }
    if (minD > 18) centers.push(p);
  }

  for (let iter = 0; iter < 6; iter++) {
    const sums = centers.map(() => [0, 0, 0, 0] as number[]);
    for (const p of samples) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < centers.length; c++) {
        const cc = centers[c];
        const d = distance(p[0], p[1], p[2], cc[0], cc[1], cc[2]);
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      const acc = sums[best];
      acc[0] += p[0];
      acc[1] += p[1];
      acc[2] += p[2];
      acc[3] += 1;
    }
    for (let c = 0; c < centers.length; c++) {
      const acc = sums[c];
      if (acc[3] > 0) {
        centers[c] = [acc[0] / acc[3], acc[1] / acc[3], acc[2] / acc[3]] as [number, number, number];
      }
    }
  }
  return centers;
}

function floodFillBackground(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  bgColors: [number, number, number][],
  tolerance: number,
  feather: number
) {
  const mask = new Uint8Array(w * h);

  const isBgColor = (r: number, g: number, b: number) => {
    let minD = Infinity;
    for (const c of bgColors) {
      const d = distance(r, g, b, c[0], c[1], c[2]);
      if (d < minD) minD = d;
    }
    return minD;
  };

  const stack: number[] = [];
  const push = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = y * w + x;
    if (mask[idx] !== 0) return;
    const p = idx * 4;
    const d = isBgColor(data[p], data[p + 1], data[p + 2]);
    if (d <= tolerance) {
      mask[idx] = 1;
      stack.push(idx);
    } else if (d <= tolerance + feather) {
      mask[idx] = 3;
    } else {
      mask[idx] = 2;
    }
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (stack.length) {
    const idx = stack.pop()!;
    const x = idx % w;
    const y = (idx / w) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  return mask;
}

async function removeBackground(
  src: string,
  tolerance: number,
  feather: number
): Promise<string> {
  const cacheKey = `${src}|${tolerance}|${feather}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
    img.src = src;
  });

  const MAX_DIM = 1200;
  let w = img.naturalWidth;
  let h = img.naturalHeight;
  const s = Math.min(1, MAX_DIM / Math.max(w, h));
  w = Math.round(w * s);
  h = Math.round(h * s);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context unavailable");
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const samples = collectBorderSamples(data, w, h);
  const centers = clusterBackground(samples, 6);
  const mask = floodFillBackground(data, w, h, centers, tolerance, feather);

  const isBgColor = (r: number, g: number, b: number) => {
    let minD = Infinity;
    for (const c of centers) {
      const d = distance(r, g, b, c[0], c[1], c[2]);
      if (d < minD) minD = d;
    }
    return minD;
  };

  for (let i = 0; i < mask.length; i++) {
    const p = i * 4;
    if (mask[i] === 1) {
      data[p + 3] = 0;
    } else if (mask[i] === 3) {
      const d = isBgColor(data[p], data[p + 1], data[p + 2]);
      const t = (d - tolerance) / feather;
      data[p + 3] = Math.round(Math.max(0, Math.min(1, t)) * 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const url = canvas.toDataURL("image/png");
  cache.set(cacheKey, url);
  return url;
}

export default function TransparentImage({
  src,
  alt = "",
  tolerance = 60,
  feather = 35,
  className = "",
  style,
  loading = "lazy",
}: Props) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(cache.get(`${src}|${tolerance}|${feather}`) ?? null);
  const [failed, setFailed] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;
    if (!processedSrc) {
      removeBackground(src, tolerance, feather)
        .then((url) => {
          if (!cancelled && mountedRef.current) setProcessedSrc(url);
        })
        .catch(() => {
          if (!cancelled && mountedRef.current) setFailed(true);
        });
    }
    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [src, tolerance, feather]);

  if (failed) {
    return (
      <img src={src} alt={alt} loading={loading} decoding="async" className={className} style={style} />
    );
  }

  return (
    <img
      src={processedSrc ?? src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      style={{
        ...style,
        opacity: processedSrc ? (style?.opacity ?? 1) : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
