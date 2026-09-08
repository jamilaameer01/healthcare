import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  InstancedMesh,
  LineSegments,
  Object3D,
} from "three";
import type { SceneProps } from "./Stage";

const TMP = new Object3D();

/**
 * "Your health is connected" — nodes drift as fragments, then resolve into an
 * organised biological network as the section is scrolled through.
 */
export default function NetworkScene({ quality, progress, pointer }: SceneProps) {
  const group = useRef<Group>(null);
  const mesh = useRef<InstancedMesh>(null);
  const lines = useRef<LineSegments>(null);
  const { camera } = useThree();

  const count = quality === "high" ? 54 : 30;

  const { scattered, organised, links } = useMemo(() => {
    const scatteredPts: [number, number, number][] = [];
    const organisedPts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      organisedPts.push([Math.cos(theta) * r * 1.9, y * 1.9, Math.sin(theta) * r * 1.9]);
      scatteredPts.push([
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ]);
    }
    const pairs: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const a = organisedPts[i]!;
        const b = organisedPts[j]!;
        const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (d < 1.15) pairs.push([i, j]);
      }
    }
    return { scattered: scatteredPts, organised: organisedPts, links: pairs.slice(0, 220) };
  }, [count]);

  const lineGeometry = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(links.length * 6), 3));
    return g;
  }, [links.length]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = Math.min(1, Math.max(0, progress.current));
    const ease = p * p * (3 - 2 * p);
    const g = group.current;
    const im = mesh.current;
    if (!g || !im) return;

    g.rotation.y += delta * 0.08;
    g.rotation.x += (pointer.current.y * 0.15 - g.rotation.x) * Math.min(1, delta * 2);

    const pos = lineGeometry.getAttribute("position") as BufferAttribute;
    const current: [number, number, number][] = [];

    for (let i = 0; i < count; i++) {
      const s = scattered[i]!;
      const o = organised[i]!;
      const wobble = (1 - ease) * Math.sin(t * 0.6 + i) * 0.25;
      const x = s[0] + (o[0] - s[0]) * ease + wobble;
      const y = s[1] + (o[1] - s[1]) * ease;
      const z = s[2] + (o[2] - s[2]) * ease;
      current.push([x, y, z]);
      TMP.position.set(x, y, z);
      const scale = 0.03 + 0.022 * ease;
      TMP.scale.setScalar(scale);
      TMP.updateMatrix();
      im.setMatrixAt(i, TMP.matrix);
    }
    im.instanceMatrix.needsUpdate = true;

    const linkStrength = Math.max(0, (ease - 0.35) / 0.65);
    for (let k = 0; k < links.length; k++) {
      const [i, j] = links[k]!;
      const a = current[i]!;
      const b = current[j]!;
      const bx = a[0] + (b[0] - a[0]) * linkStrength;
      const by = a[1] + (b[1] - a[1]) * linkStrength;
      const bz = a[2] + (b[2] - a[2]) * linkStrength;
      pos.setXYZ(k * 2, a[0], a[1], a[2]);
      pos.setXYZ(k * 2 + 1, bx, by, bz);
    }
    pos.needsUpdate = true;
    if (lines.current) {
      const mat = lines.current.material as { opacity: number; transparent: boolean };
      mat.transparent = true;
      mat.opacity = 0.1 + linkStrength * 0.22;
    }

    camera.position.z = 7.2 - ease * 1.1;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 4]} intensity={1.3} color="#ffe9d6" />
      <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#8fb3c4" />

      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, quality === "high" ? 2 : 1]} />
        <meshStandardMaterial color={new Color("#f3e6d8")} roughness={0.55} metalness={0.05} />
      </instancedMesh>

      <lineSegments ref={lines} geometry={lineGeometry}>
        <lineBasicMaterial color="#d09a76" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}
