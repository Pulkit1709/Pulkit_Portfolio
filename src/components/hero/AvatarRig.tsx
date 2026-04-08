import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";
import { AVATAR_MOTION } from "../../effects/avatar";

const AVATAR_IMAGE_URL = "/images/pulkit-professional.png";

export function AvatarRig({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<Group>(null);
  const portrait = useRef<Mesh>(null);
  const card = useRef<Mesh>(null);
  const glow = useRef<Mesh>(null);
  const texture = useTexture(AVATAR_IMAGE_URL);
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

    if (card.current) card.current.rotation.y = MathUtils.lerp(card.current.rotation.y, root.current.rotation.y * 0.45, 0.05);
    if (glow.current) glow.current.rotation.z = Math.sin(t * 0.6) * 0.08;

    if (blink.current >= nextBlinkAt.current) {
      if (portrait.current) portrait.current.scale.y = MathUtils.lerp(portrait.current.scale.y, 0.985, 0.6);
      nextBlinkAt.current = blink.current + 0.14 + Math.random() * 0.12;
    } else if (blink.current > nextBlinkAt.current - 0.35) {
      if (portrait.current) portrait.current.scale.y = MathUtils.lerp(portrait.current.scale.y, 1, 0.45);
      if (blink.current > nextBlinkAt.current) {
        blink.current = 0;
        nextBlinkAt.current = 2 + Math.random() * 3;
      }
    }
  });

  return (
    <group ref={root} position={[0, -1.15, 0]} scale={1.7}>
      <mesh ref={glow} position={[0, 0.08, -0.18]}>
        <circleGeometry args={[1.18, 48]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.22} />
      </mesh>

      <mesh ref={card} position={[0, 0.05, -0.03]} castShadow receiveShadow>
        <boxGeometry args={[1.32, 1.85, 0.06]} />
        <meshStandardMaterial color="#0b0d1a" roughness={0.35} metalness={0.15} />
      </mesh>

      <mesh ref={portrait} castShadow receiveShadow>
        <planeGeometry args={[1.18, 1.72, 1, 1]} />
        <meshStandardMaterial map={texture} roughness={0.55} metalness={0.04} />
      </mesh>
    </group>
  );
}
