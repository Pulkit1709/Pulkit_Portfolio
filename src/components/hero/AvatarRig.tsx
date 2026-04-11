import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { CanvasTexture, MathUtils, NoColorSpace } from "three";
import { AVATAR_MOTION } from "../../effects/avatar";

const AVATAR_IMAGE_URL = "/images/pulkit-professional.png";

const PORTRAIT_SIZE = 1.32;

function createCircleAlphaTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const cx = size / 2;
  const r = size / 2 - 3;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx, cx, r, 0, Math.PI * 2);
  ctx.fill();
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = NoColorSpace;
  return tex;
}

export function AvatarRig({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<Group>(null);
  const portrait = useRef<Mesh>(null);
  const frame = useRef<Mesh>(null);
  const glow = useRef<Mesh>(null);
  const texture = useTexture(AVATAR_IMAGE_URL);
  const circleAlpha = useMemo(() => createCircleAlphaTexture(), []);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const blink = useRef(0);
  const nextBlinkAt = useRef(2 + Math.random() * 3);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      pointerTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  useEffect(() => {
    const img = texture.image as HTMLImageElement | undefined;
    if (!img?.naturalWidth) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const a = w / h;
    texture.center.set(0.5, 0.5);
    if (a >= 1) {
      texture.repeat.set(1 / a, 1);
      texture.offset.set((1 - 1 / a) / 2, 0);
    } else {
      texture.repeat.set(1, a);
      texture.offset.set(0, (1 - a) / 2);
    }
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    return () => circleAlpha?.dispose();
  }, [circleAlpha]);

  useFrame((state, dt) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    const intensity = reducedMotion ? 0.35 : 1;
    blink.current += dt;

    const lookX = MathUtils.lerp(
      root.current.rotation.y,
      pointerTarget.current.x * AVATAR_MOTION.pointerBodyY * intensity,
      0.06
    );
    const lookY = MathUtils.lerp(
      root.current.rotation.x,
      -pointerTarget.current.y * AVATAR_MOTION.pointerBodyX * intensity,
      0.06
    );
    root.current.rotation.y = lookX;
    root.current.rotation.x = lookY;
    root.current.position.y =
      Math.sin(t * AVATAR_MOTION.breathFrequency) * AVATAR_MOTION.breathAmplitude * intensity;

    if (portrait.current) {
      portrait.current.rotation.y = MathUtils.lerp(
        portrait.current.rotation.y,
        pointerTarget.current.x * 0.08 * intensity + Math.sin(t * 0.45) * 0.03,
        0.08
      );
      portrait.current.rotation.x = MathUtils.lerp(
        portrait.current.rotation.x,
        -pointerTarget.current.y * 0.06 * intensity + Math.sin(t * 0.35) * 0.02,
        0.08
      );
    }

    if (frame.current) frame.current.rotation.y = MathUtils.lerp(frame.current.rotation.y, root.current.rotation.y * 0.45, 0.05);
    if (glow.current) glow.current.rotation.z = Math.sin(t * 0.6) * 0.08;

    if (blink.current >= nextBlinkAt.current) {
      if (portrait.current) {
        const s = MathUtils.lerp(portrait.current.scale.x, 0.985, 0.6);
        portrait.current.scale.setScalar(s);
      }
      nextBlinkAt.current = blink.current + 0.14 + Math.random() * 0.12;
    } else if (blink.current > nextBlinkAt.current - 0.35) {
      if (portrait.current) {
        const s = MathUtils.lerp(portrait.current.scale.x, 1, 0.45);
        portrait.current.scale.setScalar(s);
      }
      if (blink.current > nextBlinkAt.current) {
        blink.current = 0;
        nextBlinkAt.current = 2 + Math.random() * 3;
      }
    }
  });

  const r = PORTRAIT_SIZE / 2;
  const ringInner = r * 0.92;
  const ringOuter = r * 1.06;

  return (
    <group ref={root} position={[0, -1.15, 0]} scale={1.7}>
      <mesh ref={glow} position={[0, 0.08, -0.2]}>
        <circleGeometry args={[ringOuter * 1.08, 48]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.22} />
      </mesh>

      <mesh ref={frame} position={[0, 0.05, -0.04]} castShadow receiveShadow>
        <ringGeometry args={[ringInner, ringOuter, 64]} />
        <meshStandardMaterial color="#1a1530" roughness={0.4} metalness={0.55} emissive="#2d2650" emissiveIntensity={0.12} />
      </mesh>

      <mesh ref={portrait} position={[0, 0.05, 0]} castShadow receiveShadow>
        <planeGeometry args={[PORTRAIT_SIZE, PORTRAIT_SIZE, 1, 1]} />
        <meshStandardMaterial
          map={texture}
          alphaMap={circleAlpha ?? undefined}
          transparent
          alphaTest={0.02}
          roughness={0.55}
          metalness={0.04}
        />
      </mesh>
    </group>
  );
}
