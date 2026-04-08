import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";
import { AVATAR_MOTION } from "../../effects/avatar";

const AVATAR_URL =
  "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@main/2.0/RobotExpressive/glTF/RobotExpressive.gltf";

type MorphMesh = Mesh & {
  morphTargetDictionary?: Record<string, number>;
  morphTargetInfluences?: number[];
};
type AvatarRuntimeData = {
  morphMeshes: MorphMesh[];
  headBone: Group | null;
  eyeLeft: Group | null;
  eyeRight: Group | null;
};

function setMorph(meshes: MorphMesh[], key: string, value: number) {
  meshes.forEach((mesh) => {
    const dictionary = mesh.morphTargetDictionary;
    const influences = mesh.morphTargetInfluences;
    if (!dictionary || !influences) return;
    const index = dictionary[key];
    if (typeof index === "number" && influences[index] !== undefined) {
      influences[index] = value;
    }
  });
}

export function AvatarRig({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<Group>(null);
  const { scene, animations } = useGLTF(AVATAR_URL);
  const { actions } = useAnimations(animations, root);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const blink = useRef(0);
  const nextBlinkAt = useRef(2 + Math.random() * 3);

  const data = useMemo<AvatarRuntimeData>(() => {
    const cache: AvatarRuntimeData = {
      morphMeshes: [],
      headBone: null,
      eyeLeft: null,
      eyeRight: null,
    };

    scene.traverse((obj) => {
      const lower = obj.name.toLowerCase();
      if ("isMesh" in obj) {
        const mesh = obj as MorphMesh;
        if (mesh.morphTargetDictionary) cache.morphMeshes.push(mesh);
      }
      if (!cache.headBone && (lower.includes("head") || lower.includes("neck"))) cache.headBone = obj as Group;
      if (!cache.eyeLeft && lower.includes("eye") && lower.includes("left")) cache.eyeLeft = obj as Group;
      if (!cache.eyeRight && lower.includes("eye") && lower.includes("right")) cache.eyeRight = obj as Group;
    });

    return cache;
  }, [scene]);

  useEffect(() => {
    const idle = actions?.Idle ?? Object.values(actions ?? {})[0];
    if (!idle) return;
    idle.reset().fadeIn(0.4).play();
    return () => {
      idle.fadeOut(0.25);
    };
  }, [actions]);

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

    if (data.headBone) {
      data.headBone.rotation.y = MathUtils.lerp(
        data.headBone.rotation.y,
        pointerTarget.current.x * 0.12 * intensity + Math.sin(t * 0.45) * 0.06,
        0.08
      );
      data.headBone.rotation.x = MathUtils.lerp(
        data.headBone.rotation.x,
        -pointerTarget.current.y * 0.06 * intensity + Math.sin(t * 0.3) * 0.03,
        0.08
      );
    }

    [data.eyeLeft, data.eyeRight].forEach((eye) => {
      if (!eye) return;
      eye.rotation.y = MathUtils.lerp(
        eye.rotation.y,
        pointerTarget.current.x * AVATAR_MOTION.eyeY * intensity,
        0.12
      );
      eye.rotation.x = MathUtils.lerp(
        eye.rotation.x,
        -pointerTarget.current.y * AVATAR_MOTION.eyeX * intensity,
        0.12
      );
    });

    if (blink.current >= nextBlinkAt.current) {
      setMorph(data.morphMeshes, "Blink", 1);
      setMorph(data.morphMeshes, "blink", 1);
      setMorph(data.morphMeshes, "eyeBlinkLeft", 1);
      setMorph(data.morphMeshes, "eyeBlinkRight", 1);
      setMorph(data.morphMeshes, "mouthSmile", 0.2 + Math.sin(t * 0.5) * 0.1);
      nextBlinkAt.current = blink.current + 0.14 + Math.random() * 0.12;
    } else if (blink.current > nextBlinkAt.current - 0.35) {
      setMorph(data.morphMeshes, "Blink", 0);
      setMorph(data.morphMeshes, "blink", 0);
      setMorph(data.morphMeshes, "eyeBlinkLeft", 0);
      setMorph(data.morphMeshes, "eyeBlinkRight", 0);
      if (blink.current > nextBlinkAt.current) {
        blink.current = 0;
        nextBlinkAt.current = 2 + Math.random() * 3;
      }
    }

    setMorph(data.morphMeshes, "browInnerUp", 0.04 + Math.sin(t * 0.5) * 0.02);
    setMorph(data.morphMeshes, "mouthSmile", 0.07 + Math.sin(t * 0.9) * 0.02);
  });

  return (
    <group ref={root} position={[0, -1.9, 0]} scale={1.95}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(AVATAR_URL);
