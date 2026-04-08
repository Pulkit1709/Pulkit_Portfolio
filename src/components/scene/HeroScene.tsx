import { Float, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

function OrbitalForms({ reducedMotion }: { reducedMotion: boolean }) {
  const orbA = useRef<Mesh>(null);
  const orbB = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbA.current) {
      orbA.current.rotation.x = t * 0.18;
      orbA.current.rotation.y = t * 0.24;
      orbA.current.position.y = Math.sin(t * 0.6) * (reducedMotion ? 0.04 : 0.1);
    }
    if (orbB.current) {
      orbB.current.rotation.x = -t * 0.16;
      orbB.current.rotation.z = t * 0.2;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.08;
      ring.current.rotation.x = Math.sin(t * 0.15) * 0.25;
    }
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 6, 18]} />
      <ambientLight intensity={0.7} />
      <directionalLight intensity={1.6} position={[4, 6, 5]} color="#f5d38f" />
      <pointLight intensity={2} position={[-4, -1, 3]} color="#6ee7d8" />

      <Float
        speed={reducedMotion ? 0.4 : 1}
        rotationIntensity={reducedMotion ? 0.08 : 0.25}
      >
        <mesh ref={orbA} position={[-1.4, 0.8, 0]}>
          <icosahedronGeometry args={[1.2, 12]} />
          <meshStandardMaterial
            color="#f6b75d"
            roughness={0.18}
            metalness={0.25}
          />
        </mesh>
      </Float>

      <Float
        speed={reducedMotion ? 0.3 : 0.8}
        rotationIntensity={reducedMotion ? 0.05 : 0.16}
      >
        <mesh ref={orbB} position={[1.6, -0.6, -0.8]}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#8be9d5"
            roughness={0.24}
            metalness={0.2}
          />
        </mesh>
      </Float>

      <mesh ref={ring} position={[0.45, 0.15, -1.8]}>
        <torusGeometry args={[2.4, 0.06, 16, 120]} />
        <meshStandardMaterial color="#89a7ff" roughness={0.35} metalness={0.1} />
      </mesh>
    </>
  );
}

export function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6.8]} fov={34} />
          <OrbitalForms reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
