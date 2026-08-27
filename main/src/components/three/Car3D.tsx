import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/**
 * Car3D — A reusable 3D car showcase component.
 *
 * Supports TWO modes:
 * 1. Pass a `glbUrl` to load a real GLB model (recommended for production).
 *    Simply drop your car.glb into /public/models/ and pass `glbUrl="/models/car.glb"`.
 * 2. Omit `glbUrl` to render a procedural low-poly sports car as a fallback.
 *
 * The car auto-rotates gently, wheels spin, and it floats subtly.
 * Rendered on a transparent canvas so it composites cleanly onto any background.
 */

interface Car3DProps {
  glbUrl?: string;
  color?: string;
  className?: string;
  autoSpin?: boolean;
  scale?: number;
  cameraPosition?: [number, number, number];
}

export default function Car3D({
  glbUrl,
  color = "#e11d2a",
  className = "w-full h-full",
  autoSpin = true,
  scale = 1,
  cameraPosition = [4.5, 2, 5.5],
}: Car3DProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={35} />
        <Suspense fallback={null}>
          {/* Cinematic 3-point lighting */}
          <ambientLight intensity={0.4} />
          <spotLight
            position={[6, 8, 4]}
            angle={0.5}
            penumbra={1}
            intensity={2.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight
            position={[-6, 4, -4]}
            angle={0.55}
            penumbra={1}
            intensity={1.7}
            color={color}
          />
          <pointLight position={[0, 3, -6]} intensity={1.3} color="#ffffff" />

          <Float
            speed={1.4}
            rotationIntensity={0.15}
            floatIntensity={0.5}
            floatingRange={[-0.06, 0.12]}
          >
            {glbUrl ? (
              <GLBCarModel url={glbUrl} scale={scale} autoSpin={autoSpin} />
            ) : (
              <ProceduralCarModel color={color} scale={scale} autoSpin={autoSpin} />
            )}
          </Float>

          {/* Soft ground contact shadow to anchor the car */}
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={0.65}
            scale={14}
            blur={2.6}
            far={4}
            color="#000000"
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ---------- GLB Loader Path ---------- */
function GLBCarModel({
  url,
  scale,
  autoSpin,
}: {
  url: string;
  scale: number;
  autoSpin: boolean;
}) {
  const gltf = useGLTF(url);
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoSpin && group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}

/* ---------- Procedural Fallback: Modern Sports Car ---------- */
function ProceduralCarModel({
  color,
  scale,
  autoSpin,
}: {
  color: string;
  scale: number;
  autoSpin: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    if (autoSpin && group.current) {
      group.current.rotation.y += delta * 0.3;
    }
    wheels.current.forEach((w) => {
      if (w) w.rotation.x += delta * 6;
    });
  });

  const bodyMat = (
    <meshStandardMaterial
      color={color}
      metalness={0.85}
      roughness={0.28}
      envMapIntensity={1.6}
    />
  );
  const glassMat = (
    <meshPhysicalMaterial
      color="#08080a"
      metalness={0.4}
      roughness={0.08}
      transmission={0.15}
      transparent
      opacity={0.75}
    />
  );
  const trimMat = <meshStandardMaterial color="#0a0a0a" metalness={0.75} roughness={0.4} />;

  const wheelPositions: [number, number, number][] = [
    [1.05, -0.35, 1.35],
    [-1.05, -0.35, 1.35],
    [1.05, -0.35, -1.35],
    [-1.05, -0.35, -1.35],
  ];

  return (
    <group ref={group} position={[0, 0.2, 0]} scale={0.9 * scale}>
      {/* Chassis / lower body */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.5, 4.4]} />
        {bodyMat}
      </mesh>

      {/* Main body */}
      <mesh position={[0, 0.25, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.95, 0.55, 3.4]} />
        {bodyMat}
      </mesh>

      {/* Hood slope (front) */}
      <mesh position={[0, 0.15, 1.75]} rotation={[0.28, 0, 0]} castShadow>
        <boxGeometry args={[1.9, 0.45, 1.4]} />
        {bodyMat}
      </mesh>

      {/* Rear slope */}
      <mesh position={[0, 0.2, -1.85]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.9, 0.5, 1.2]} />
        {bodyMat}
      </mesh>

      {/* Cabin roof */}
      <mesh position={[0, 0.75, -0.25]} castShadow>
        <boxGeometry args={[1.55, 0.5, 1.9]} />
        {bodyMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.7, 0.85]} rotation={[0.55, 0, 0]}>
        <boxGeometry args={[1.5, 0.7, 0.08]} />
        {glassMat}
      </mesh>
      {/* Rear window */}
      <mesh position={[0, 0.72, -1.25]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[1.5, 0.6, 0.08]} />
        {glassMat}
      </mesh>
      {/* Side windows */}
      <mesh position={[0.79, 0.75, -0.25]}>
        <boxGeometry args={[0.06, 0.42, 1.7]} />
        {glassMat}
      </mesh>
      <mesh position={[-0.79, 0.75, -0.25]}>
        <boxGeometry args={[0.06, 0.42, 1.7]} />
        {glassMat}
      </mesh>

      {/* Front splitter */}
      <mesh position={[0, -0.32, 2.15]}>
        <boxGeometry args={[2.0, 0.12, 0.5]} />
        {trimMat}
      </mesh>

      {/* Rear wing */}
      <mesh position={[0, 0.72, -2.25]}>
        <boxGeometry args={[2.0, 0.06, 0.4]} />
        {trimMat}
      </mesh>
      <mesh position={[0.75, 0.5, -2.2]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        {trimMat}
      </mesh>
      <mesh position={[-0.75, 0.5, -2.2]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        {trimMat}
      </mesh>

      {/* Headlights (emissive white) */}
      <mesh position={[0.65, 0.05, 2.32]}>
        <boxGeometry args={[0.5, 0.16, 0.06]} />
        <meshStandardMaterial color="#ffffff" emissive="#eaf6ff" emissiveIntensity={3} />
      </mesh>
      <mesh position={[-0.65, 0.05, 2.32]}>
        <boxGeometry args={[0.5, 0.16, 0.06]} />
        <meshStandardMaterial color="#ffffff" emissive="#eaf6ff" emissiveIntensity={3} />
      </mesh>

      {/* Taillights (emissive, brand color) */}
      <mesh position={[0.7, 0.25, -2.42]}>
        <boxGeometry args={[0.45, 0.14, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
      </mesh>
      <mesh position={[-0.7, 0.25, -2.42]}>
        <boxGeometry args={[0.45, 0.14, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
      </mesh>
      {/* Rear light bar */}
      <mesh position={[0, 0.25, -2.42]}>
        <boxGeometry args={[1.3, 0.04, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
      </mesh>

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <mesh
            ref={(el) => {
              if (el) wheels.current[i] = el;
            }}
            castShadow
          >
            <cylinderGeometry args={[0.5, 0.5, 0.35, 24]} />
            <meshStandardMaterial color="#0c0c0c" metalness={0.5} roughness={0.7} />
          </mesh>
          {/* Rim */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
            <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Underglow */}
      <pointLight position={[0, -0.6, 0]} color={color} intensity={2.5} distance={4} />
    </group>
  );
}

// Preload common GLB URLs to avoid layout shifts.
// Add your own GLB paths here for faster subsequent loads:
// useGLTF.preload("/models/hero-car.glb");
