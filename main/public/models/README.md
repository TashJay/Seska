# 3D Car Models — Drop-in GLB Files

Place your GLB files here (e.g. `hero-car.glb`, `necromancer.glb`, `bmw-m5.glb`).

## Swapping the Hero Car

In `src/components/HeroSection.tsx`, find the `<Car3D />` component and pass a `glbUrl`:

```tsx
<Car3D
  glbUrl="/models/hero-car.glb"   // ← your GLB file
  color="#e11d2a"
  autoSpin={true}
  cameraPosition={[4.5, 2, 5.5]}
/>
```

If no `glbUrl` is provided, a procedural low-poly sports car is rendered
as a fallback so the page always shows something in the 3D stage.

## Recommended GLB constraints

- ~2–5 MB per model for good page-load performance
- Y-up axis (the standard glTF convention)
- Origin at the wheel contact point
- Include baked PBR textures for realism
- Test with drei's `useGLTF.preload("/models/your-car.glb")` to preload

## Free places to find car GLBs

- [Poly Haven](https://polyhaven.com/models) (CC0)
- [Sketchfab — free downloadable](https://sketchfab.com/search?type=models&features=downloadable) (filter CC0 / CC-BY)
- [Khronos glTF sample models](https://github.com/KhronosGroup/glTF-Sample-Models)
