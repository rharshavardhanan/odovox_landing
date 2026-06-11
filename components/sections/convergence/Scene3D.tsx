"use client";

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

export type Progress = MutableRefObject<{ value: number }>;

const TILES = [
  { label: "Clinical notes", bg: "#DDE8DD" },
  { label: "Prescription", bg: "#F5D5BC" },
  { label: "Appointment", bg: "#DCE8F7" },
  { label: "Billing", bg: "#F3E6A8" },
  { label: "Follow-up", bg: "#DDE8DD" },
  { label: "Patient record", bg: "#ECEBE8" },
  { label: "Charting", bg: "#DCE8F7" },
  { label: "Tab switching", bg: "#F5D5BC" },
];

const SCATTER: [number, number, number][] = [
  [-4.6, 2.1, -1.2],
  [4.4, 1.7, -2.0],
  [-3.9, -1.9, 0.6],
  [4.0, -2.1, -1.4],
  [-5.2, 0.1, 1.4],
  [5.1, -0.5, 0.9],
  [-2.3, 3.0, -2.4],
  [2.6, 3.1, 0.7],
];

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeTileTexture(label: string, bg: string) {
  const W = 560;
  const H = 200;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  // card
  roundRect(ctx, 6, 6, W - 12, H - 12, 34);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(22,22,22,0.10)";
  ctx.stroke();
  // accent dot
  ctx.beginPath();
  ctx.arc(56, H / 2, 11, 0, Math.PI * 2);
  ctx.fillStyle = "#161616";
  ctx.globalAlpha = 0.85;
  ctx.fill();
  ctx.globalAlpha = 1;
  // label
  ctx.fillStyle = "#161616";
  ctx.font =
    '600 54px "Hanken Grotesk", system-ui, -apple-system, sans-serif';
  ctx.textBaseline = "middle";
  ctx.fillText(label, 92, H / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Phone() {
  const screen = useTexture("/media/app-home.jpg");
  screen.colorSpace = THREE.SRGBColorSpace;
  screen.anisotropy = 8;

  // iPhone-ish proportions
  const w = 2.32;
  const h = 4.74;
  return (
    <group>
      <RoundedBox args={[w, h, 0.26]} radius={0.34} smoothness={6}>
        <meshStandardMaterial color="#101010" metalness={0.55} roughness={0.32} />
      </RoundedBox>
      <mesh position={[0, 0, 0.135]}>
        <planeGeometry args={[w - 0.18, h - 0.2]} />
        <meshStandardMaterial
          map={screen}
          emissive="#ffffff"
          emissiveMap={screen}
          emissiveIntensity={0.42}
          roughness={0.85}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      {/* soft screen glow */}
      <pointLight position={[0, 0, 1.4]} intensity={6} distance={6} color="#fff7e8" />
    </group>
  );
}

function Tiles({ progress }: { progress: Progress }) {
  const group = useRef<THREE.Group>(null);
  const textures = useMemo(
    () => TILES.map((t) => makeTileTexture(t.label, t.bg)),
    [],
  );
  const meshes = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const p = progress.current.value;
    const t = state.clock.elapsedTime;
    meshes.current.forEach((m, i) => {
      if (!m) return;
      // absorb: 0 = scattered, 1 = pulled into phone & gone
      const start = 0.16 + i * 0.034;
      const absorb = THREE.MathUtils.clamp((p - start) / 0.26, 0, 1);
      const e = absorb * absorb * (3 - 2 * absorb); // smoothstep
      const [sx, sy, sz] = SCATTER[i];
      // converge toward a point just in front of the phone, slight fan
      const tx = THREE.MathUtils.lerp(sx, (i - 3.5) * 0.12, e);
      const ty = THREE.MathUtils.lerp(sy, (i % 2 ? 0.2 : -0.2), e);
      const tz = THREE.MathUtils.lerp(sz, 0.5, e);
      // idle drift before absorbing
      const bob = (1 - e) * Math.sin(t * 0.8 + i * 1.7) * 0.12;
      m.position.set(tx, ty + bob, tz);
      const s = THREE.MathUtils.lerp(1, 0.02, e);
      m.scale.setScalar(s);
      const op = 1 - THREE.MathUtils.smoothstep(absorb, 0.7, 1);
      (m.material as THREE.MeshBasicMaterial).opacity = op;
      // billboard toward camera for readable labels
      m.lookAt(state.camera.position);
    });
  });

  return (
    <group ref={group}>
      {TILES.map((tile, i) => (
        <mesh
          key={tile.label}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          position={SCATTER[i]}
        >
          <planeGeometry args={[1.4, 0.5]} />
          <meshBasicMaterial
            map={textures[i]}
            transparent
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ progress }: { progress: Progress }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const p = progress.current.value;
    // Stay wide while the tiles converge (0..0.32), then fly in (0.32..0.9).
    const fly = THREE.MathUtils.smoothstep(p, 0.32, 0.9);
    const targetZ = THREE.MathUtils.lerp(9.4, 3.25, fly);
    const targetY = THREE.MathUtils.lerp(0.35, 0, fly);
    const targetX = Math.sin(p * Math.PI) * 0.22 * (1 - fly);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({ progress }: { progress: Progress }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 9.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#1a1a19"]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 6]} intensity={1.7} />
        <directionalLight position={[-6, -2, 2]} intensity={0.5} color="#cfe0ff" />
        {/* rim light for a premium edge on the dark phone */}
        <directionalLight position={[0, 2, -6]} intensity={1.1} color="#fff2dd" />
        <Phone />
        <Tiles progress={progress} />
        <Rig progress={progress} />
      </Suspense>
    </Canvas>
  );
}
