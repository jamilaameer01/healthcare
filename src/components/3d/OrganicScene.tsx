import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Group, Mesh } from "three";
import type { SceneProps } from "./Stage";

/**
 * Hero centrepiece: a soft organic membrane — an abstract read on tissue and
 * cellular form. Matte satin material, slow breathing motion, scroll-linked depth.
 */
export default function OrganicScene({ quality, progress, pointer }: SceneProps) {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);
  const { camera } = useThree();

  const detail = quality === "high" ? 48 : 20;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const g = group.current;
    if (!g) return;

    const targetX = pointer.current.y * 0.12 + p * 0.35;
    const targetY = pointer.current.x * 0.18 + t * 0.06;
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 2.5);
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 2.5);
    g.position.y = Math.sin(t * 0.45) * 0.08 - p * 0.6;
    g.scale.setScalar(0.92 - p * 0.12);

    camera.position.z = 6.6 - p * 0.9;
    camera.lookAt(0, 0, 0);

    if (core.current) core.current.rotation.z = -t * 0.08;
    if (shell.current) shell.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} color="#fff1e0" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#c8d6dd" />

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.45, detail >= 40 ? 6 : 3]} />
        <MeshDistortMaterial
          speed={0.65}
          distort={0.34}
          roughness={0.6}
          metalness={0.02}
          color="#e3cdb4"
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh ref={core} scale={0.86}>
        <icosahedronGeometry args={[1.1, detail >= 40 ? 5 : 3]} />
        <MeshDistortMaterial
          speed={0.9}
          distort={0.5}
          roughness={0.35}
          metalness={0.05}
          color="#b56b41"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
