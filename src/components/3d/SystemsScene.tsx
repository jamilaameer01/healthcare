import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  TextureLoader,
} from "three";
import type { SceneProps } from "./Stage";

const CENTER_IMAGE =
  "https://images.unsplash.com/photo-1711985220426-696a1c74575a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90byJhfDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const PILL_COLORS = [
  "#E98F9A",
  "#78A9D6",
  "#E7C45F",
  "#83B98E",
  "#A990D0",
  "#E29A68",
  "#C9789D",
  "#62AEB0",
  "#D9A64E",
  "#849BC5",
  "#D97C7C",
  "#7FAF78",
  "#9C78B8",
  "#D18E54",
];

const ACTIVE_COLOR = new Color("#F3A16D");

const PILL_COUNT = 28;

export default function SystemsScene({
  quality,
  progress,
  pointer,
}: SceneProps) {
  const group = useRef<Group>(null);
  const pills = useRef<(Group | null)[]>([]);

  const centerTexture = useLoader(
    TextureLoader,
    CENTER_IMAGE,
  );

  const pillData = useMemo(
    () =>
      Array.from(
        { length: PILL_COUNT },
        (_, i) => ({
          angle:
            (i / PILL_COUNT) *
            Math.PI *
            2,

          radius:
            1.25 +
            (i % 5) * 0.16,

          speed:
            0.22 +
            (i % 4) * 0.07,

          y:
            Math.sin(i * 1.7) *
            0.45,

          scale:
            0.095 +
            (i % 3) * 0.018,

          color:
            PILL_COLORS[
              i % PILL_COLORS.length
            ],
        }),
      ),
    [],
  );

  useFrame((state, delta) => {
    const t =
      state.clock.elapsedTime;

    const g = group.current;

    if (!g) return;

    /*
     * --------------------------------
     * IMPORTANT
     * --------------------------------
     *
     * No group rotation here.
     *
     * This keeps the center image
     * completely static.
     */

    /*
     * Only very subtle pointer movement
     * for the whole composition.
     *
     * Remove this too if you want the
     * entire scene completely fixed.
     */
    g.rotation.x +=
      (pointer.current.y * 0.08 -
        g.rotation.x) *
      Math.min(1, delta * 3);

    g.position.x +=
      (pointer.current.x * 0.035 -
        g.position.x) *
      Math.min(1, delta * 3);

    /*
     * --------------------------------
     * ACTIVE PILL
     * --------------------------------
     */

    const activeIdx = Math.round(
      Math.min(
        1,
        Math.max(
          0,
          progress.current,
        ),
      ) *
        (PILL_COUNT - 1),
    );

    /*
     * --------------------------------
     * ORBITING TABLETS
     * --------------------------------
     */

    pills.current.forEach(
      (pill, i) => {
        if (!pill) return;

        const data = pillData[i];

        /*
         * Continuous orbit
         */
        const angle =
          data.angle +
          t * data.speed;

        /*
         * 3D elliptical orbit
         */
        const x =
          Math.cos(angle) *
          data.radius;

        const z =
          Math.sin(angle) *
          data.radius *
          0.72;

        const y =
          data.y +
          Math.sin(
            t * 0.9 +
              i * 1.35,
          ) *
            0.1;

        /*
         * Smooth position
         */
        pill.position.x +=
          (x -
            pill.position.x) *
          Math.min(
            1,
            delta * 9,
          );

        pill.position.y +=
          (y -
            pill.position.y) *
          Math.min(
            1,
            delta * 9,
          );

        pill.position.z +=
          (z -
            pill.position.z) *
          Math.min(
            1,
            delta * 9,
          );

        /*
         * --------------------------------
         * ACTIVE STATE
         * --------------------------------
         */

        const active =
          i === activeIdx;

        const targetScale =
          active
            ? data.scale * 1.5
            : data.scale;

        pill.scale.x +=
          (targetScale -
            pill.scale.x) *
          Math.min(
            1,
            delta * 10,
          );

        pill.scale.y +=
          (targetScale -
            pill.scale.y) *
          Math.min(
            1,
            delta * 10,
          );

        pill.scale.z +=
          (targetScale -
            pill.scale.z) *
          Math.min(
            1,
            delta * 10,
          );

        /*
         * --------------------------------
         * TABLET ROTATION
         * --------------------------------
         */

        pill.rotation.x +=
          delta *
          (active
            ? 0.35
            : 0.16);

        pill.rotation.y +=
          delta *
          (active
            ? 0.45
            : 0.2);

        pill.rotation.z +=
          delta *
          (active
            ? 0.2
            : 0.08);

        /*
         * --------------------------------
         * TABLET COLORS
         * --------------------------------
         */

        const mesh =
          pill.children[0] as Mesh;

        if (
          mesh &&
          mesh.material
        ) {
          const material =
            mesh.material as MeshStandardMaterial;

          const targetColor =
            active
              ? ACTIVE_COLOR
              : new Color(
                  data.color,
                );

          material.color.lerp(
            targetColor,
            Math.min(
              1,
              delta * 8,
            ),
          );

          material.emissive.lerp(
            active
              ? ACTIVE_COLOR
              : new Color(
                  "#000000",
                ),
            Math.min(
              1,
              delta * 6,
            ),
          );

          material.emissiveIntensity =
            active
              ? 0.12
              : 0;
        }
      },
    );
  });

  return (
    <group ref={group}>
      {/* --------------------------------
          LIGHTING
      -------------------------------- */}

      <ambientLight
        intensity={0.9}
      />

      <directionalLight
        position={[3, 4, 5]}
        intensity={1.3}
        color="#fff3e6"
      />

      <directionalLight
        position={[-4, -2, -3]}
        intensity={0.35}
        color="#9db8c6"
      />

      {/* --------------------------------
          STATIC CENTER IMAGE
          Rounded transparent corners
      -------------------------------- */}

      <mesh
        position={[0, 0, 0]}
        scale={[1.25, 1.25, 1]}
      >
        <planeGeometry
          args={[1.6, 1.6]}
        />

        <RoundedImageMaterial
          texture={centerTexture}
        />
      </mesh>

      {/* --------------------------------
          MULTI-COLOR TABLETS
      -------------------------------- */}

      {pillData.map(
        (pill, i) => (
          <group
            key={i}
            ref={(el) => {
              pills.current[i] =
                el;
            }}
          >
            <mesh>
              <capsuleGeometry
                args={[
                  0.28,
                  0.5,
                  8,
                  quality ===
                  "high"
                    ? 16
                    : 8,
                ]}
              />

              <meshStandardMaterial
                color={
                  pill.color
                }
                roughness={0.28}
                metalness={0.02}
                emissive="#000000"
                emissiveIntensity={0}
              />
            </mesh>
          </group>
        ),
      )}
    </group>
  );
}

/*
 * --------------------------------
 * ROUNDED IMAGE MATERIAL
 * --------------------------------
 *
 * Makes the four corners transparent
 * while keeping the image visible.
 */

function RoundedImageMaterial({
  texture,
}: {
  texture: ReturnType<
    typeof useLoader<
      typeof TextureLoader,
      string
    >
  >;
}) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,

        uniforms: {
          uTexture: {
            value: texture,
          },

          uRadius: {
            value: 0.13,
          },
        },

        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);
          }
        `,

        fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uRadius;

          varying vec2 vUv;

          float roundedBox(
            vec2 p,
            vec2 b,
            float r
          ) {
            vec2 q =
              abs(p) -
              b +
              vec2(r);

            return length(
              max(q, 0.0)
            ) -
            r;
          }

          void main() {
            vec4 image =
              texture2D(
                uTexture,
                vUv
              );

            /*
             * Convert UV to centered
             * coordinates.
             */
            vec2 p =
              vUv -
              vec2(0.5);

            /*
             * Rounded square mask.
             */
            float distance =
              roundedBox(
                p,
                vec2(0.5),
                uRadius
              );

            float alpha =
              1.0 -
              smoothstep(
                -0.01,
                0.01,
                distance
              );

            /*
             * Transparent outside
             * rounded corners.
             */
            image.a *= alpha;

            if (image.a < 0.01) {
              discard;
            }

            gl_FragColor =
              image;
          }
        `,
      }),
    [texture],
  );

  return (
    <primitive
      object={material}
      attach="material"
    />
  );
}