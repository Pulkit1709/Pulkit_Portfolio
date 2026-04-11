import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Component, Suspense, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import type { Group } from "three";
import { MathUtils } from "three";
import { useIsMobile } from "../../hooks/useIsMobile";
import { usePageVisible } from "../../hooks/usePageVisible";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import {
  HERO_CAMERA_PIXEL_RATIO,
  HERO_PARTICLE_COUNT_DESKTOP,
  HERO_PARTICLE_COUNT_MOBILE,
} from "../../effects/heroScene";
import { AvatarRig } from "./AvatarRig";

gsap.registerPlugin(ScrollTrigger);

class AvatarErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh position={[0, -1.1, 0]}>
          <capsuleGeometry args={[0.6, 1.6, 10, 20]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.35} metalness={0.2} />
        </mesh>
      );
    }
    return this.props.children;
  }
}

function CameraRig({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  const { camera, pointer } = useThree();
  const wrapper = useRef({
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    rx: camera.rotation.x,
    ry: camera.rotation.y,
  });

  useEffect(() => {
    wrapper.current.x = 0;
    wrapper.current.y = isMobile ? 0.2 : 0.1;
    wrapper.current.z = isMobile ? 6.25 : 5;
    wrapper.current.rx = 0;
    wrapper.current.ry = 0;
  }, [isMobile]);

  useEffect(() => {
    if (reducedMotion) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=200%",
        scrub: 1.2,
      },
      defaults: { ease: "power2.out" },
    });

    tl.to(wrapper.current, { x: 0.85, y: 0.2, z: 4.8, ry: 0.16 }, 0)
      .to(wrapper.current, { x: -1.2, y: 0.05, z: 6.2, ry: -0.28, rx: -0.06 }, 0.55)
      .to(wrapper.current, { x: 0.2, y: 0.2, z: 7.3, ry: 0.08, rx: -0.02 }, 1);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  useFrame(() => {
    const followX = reducedMotion ? 0 : pointer.x * 0.25;
    const followY = reducedMotion ? 0 : pointer.y * 0.14;
    camera.position.x = MathUtils.lerp(camera.position.x, wrapper.current.x + followX, 0.065);
    camera.position.y = MathUtils.lerp(camera.position.y, wrapper.current.y + followY, 0.065);
    camera.position.z = MathUtils.lerp(camera.position.z, wrapper.current.z, 0.05);
    camera.rotation.x = MathUtils.lerp(camera.rotation.x, wrapper.current.rx - pointer.y * 0.02, 0.08);
    camera.rotation.y = MathUtils.lerp(camera.rotation.y, wrapper.current.ry + pointer.x * 0.03, 0.08);
  });

  return null;
}

function SceneLighting({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <color attach="background" args={["#04030a"]} />
      <fog attach="fog" args={["#070512", 5.5, 18]} />
      <ambientLight intensity={0.55} color="#a9b5ff" />
      <directionalLight
        position={[3.8, 5.8, 5]}
        intensity={1.35}
        color="#dcd8ff"
        castShadow={!isMobile}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3.4, 1.2, -2.5]} intensity={1.6} color="#8b5cf6" />
      <pointLight position={[2.2, -1, -4]} intensity={1.15} color="#22d3ee" />
    </>
  );
}

function BackgroundOrbs({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  const group = useRef<Group>(null);
  const count = isMobile ? HERO_PARTICLE_COUNT_MOBILE : HERO_PARTICLE_COUNT_DESKTOP;
  const orbs = useMemo(
    () =>
      new Array(count).fill(null).map((_, idx) => ({
        key: idx,
        position: [
          (Math.random() - 0.5) * 11,
          (Math.random() - 0.4) * 7.5,
          -2 - Math.random() * 8,
        ] as [number, number, number],
        scale: 0.04 + Math.random() * 0.15,
      })),
    [count]
  );

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.12;
  });

  return (
    <group ref={group}>
      {orbs.map((orb) => (
        <mesh key={orb.key} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 14, 14]} />
          <meshBasicMaterial color={orb.key % 2 ? "#6d5cff" : "#2ad8ff"} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const isVisible = usePageVisible();

  return (
    <Canvas
      dpr={HERO_CAMERA_PIXEL_RATIO}
      shadows={!isMobile}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.6 }}
      camera={{ position: [0, isMobile ? 0.2 : 0.1, isMobile ? 6.25 : 5], fov: isMobile ? 38 : 32 }}
      frameloop={isVisible ? "always" : "never"}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, isMobile ? 0.2 : 0.1, isMobile ? 6.25 : 5]} fov={isMobile ? 38 : 32} />
        <SceneLighting isMobile={isMobile} />
        <BackgroundOrbs reducedMotion={reducedMotion || isMobile} isMobile={isMobile} />
        <AvatarErrorBoundary>
          <AvatarRig reducedMotion={reducedMotion || isMobile} />
        </AvatarErrorBoundary>
        <Environment preset="city" environmentIntensity={0.35} />
        <CameraRig reducedMotion={reducedMotion || isMobile} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
