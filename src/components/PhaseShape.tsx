import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import type { Group } from "three";

export type PhaseShapeKind = "cube" | "cylinder" | "sphere" | "pyramid";

const SPIN_RATES: Record<PhaseShapeKind, [number, number, number]> = {
  cube:     [0.18, 0.42, 0.0],
  cylinder: [0.0,  0.55, 0.12],
  sphere:   [0.22, 0.38, 0.0],
  pyramid:  [0.0,  0.6,  0.0],
};

const TILT: Record<PhaseShapeKind, [number, number, number]> = {
  cube:     [-0.35, 0.6,  0.0],
  cylinder: [ 0.25, 0.0,  0.35],
  sphere:   [ 0.0,  0.0,  0.0],
  pyramid:  [ 0.0,  0.0,  0.0],
};

const FILL_COLOR = "#0E3963";
const EDGE_COLOR = "#15A3C7";

function ShapeMeshes({ kind }: { kind: PhaseShapeKind }) {
  switch (kind) {
    case "cube":
      return (
        <mesh>
          <boxGeometry args={[1.35, 1.35, 1.35]} />
          <meshStandardMaterial
            color={FILL_COLOR}
            metalness={0.55}
            roughness={0.28}
            transparent
            opacity={0.22}
          />
          <Edges color={EDGE_COLOR} />
        </mesh>
      );
    case "cylinder":
      return (
        <mesh>
          <cylinderGeometry args={[0.78, 0.78, 1.7, 48, 1]} />
          <meshStandardMaterial
            color={FILL_COLOR}
            metalness={0.55}
            roughness={0.28}
            transparent
            opacity={0.22}
          />
          <Edges color={EDGE_COLOR} threshold={1} />
        </mesh>
      );
    case "sphere":
      return (
        <>
          <mesh>
            <sphereGeometry args={[0.96, 32, 24]} />
            <meshStandardMaterial
              color={FILL_COLOR}
              metalness={0.55}
              roughness={0.28}
              transparent
              opacity={0.22}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[1.0, 18, 12]} />
            <meshBasicMaterial
              color={EDGE_COLOR}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>
        </>
      );
    case "pyramid":
      return (
        <mesh>
          <coneGeometry args={[1.05, 1.7, 4, 1]} />
          <meshStandardMaterial
            color={FILL_COLOR}
            metalness={0.55}
            roughness={0.28}
            transparent
            opacity={0.22}
            flatShading
          />
          <Edges color={EDGE_COLOR} threshold={1} />
        </mesh>
      );
  }
}

function RotatingShape({ kind }: { kind: PhaseShapeKind }) {
  const groupRef = useRef<Group>(null);
  const rates = SPIN_RATES[kind];
  const tilt = TILT[kind];

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.x += delta * rates[0];
    g.rotation.y += delta * rates[1];
    g.rotation.z += delta * rates[2];
  });

  return (
    <group ref={groupRef} rotation={tilt}>
      <ShapeMeshes kind={kind} />
    </group>
  );
}

type Props = {
  kind: PhaseShapeKind;
  className?: string;
};

export function PhaseShape({ kind, className }: Props) {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 38 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        frameloop={prefersReducedMotion ? "demand" : "always"}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 5]} intensity={1.1} color="#5DD8E8" />
        <pointLight position={[-4, -2, 2]} intensity={0.55} color="#15A3C7" />
        <Suspense fallback={null}>
          <RotatingShape kind={kind} />
        </Suspense>
      </Canvas>
    </div>
  );
}
