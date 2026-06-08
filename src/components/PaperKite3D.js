'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './PaperKite3D.module.css';

/* ------------------------------------------------
   Particle Kite — thousands of tiny particles
   forming a diamond kite silhouette with tail.
   
   Dark charcoal (#3a3a3c) matching the logo bg,
   floating on the white website background.
   ------------------------------------------------ */

const KITE_COLOR = '#3a3a3c'; // Logo background color
const PARTICLE_COUNT = 4500;
const TAIL_PARTICLE_COUNT = 800;
const BOW_PARTICLE_COUNT = 200;

/* Generate random point inside a triangle (barycentric coords) */
function randomPointInTriangle(a, b, c) {
  let r1 = Math.random();
  let r2 = Math.random();
  if (r1 + r2 > 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
  }
  const x = a[0] + r1 * (b[0] - a[0]) + r2 * (c[0] - a[0]);
  const y = a[1] + r1 * (b[1] - a[1]) + r2 * (c[1] - a[1]);
  const z = a[2] + r1 * (b[2] - a[2]) + r2 * (c[2] - a[2]);
  return [x, y, z];
}

/* Generate points along a line with some scatter */
function pointsAlongLine(start, end, count, scatter = 0.03) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    points.push(
      start[0] + t * (end[0] - start[0]) + (Math.random() - 0.5) * scatter,
      start[1] + t * (end[1] - start[1]) + (Math.random() - 0.5) * scatter,
      start[2] + t * (end[2] - start[2]) + (Math.random() - 0.5) * scatter,
    );
  }
  return points;
}

/* The main kite particle system */
function KiteParticles() {
  const pointsRef = useRef();
  const initialPositions = useRef();

  const { positions, sizes, opacities } = useMemo(() => {
    const pos = [];
    const sz = [];
    const op = [];

    // Kite vertices
    const top = [0, 2.2, 0];
    const bottom = [0, -2.8, 0];
    const left = [-1.4, 0.4, 0];
    const right = [1.4, 0.4, 0];
    const center = [0, 0.4, 0];

    // Fill the 4 triangular panels with particles
    const panelTriangles = [
      [top, left, center],       // top-left
      [top, center, right],      // top-right
      [center, left, bottom],    // bottom-left
      [center, bottom, right],   // bottom-right
    ];

    const perPanel = Math.floor(PARTICLE_COUNT * 0.7 / 4);

    panelTriangles.forEach((tri) => {
      for (let i = 0; i < perPanel; i++) {
        const pt = randomPointInTriangle(tri[0], tri[1], tri[2]);
        pos.push(...pt);
        sz.push(1.5 + Math.random() * 2.0);
        op.push(0.3 + Math.random() * 0.5);
      }
    });

    // Dense edge particles for crisp borders
    const edges = [
      [top, right], [right, bottom], [bottom, left], [left, top],
    ];
    const edgeCount = Math.floor(PARTICLE_COUNT * 0.15 / 4);
    edges.forEach(([start, end]) => {
      const edgePts = pointsAlongLine(start, end, edgeCount, 0.02);
      for (let i = 0; i < edgePts.length; i += 3) {
        pos.push(edgePts[i], edgePts[i + 1], edgePts[i + 2]);
        sz.push(2.0 + Math.random() * 1.5);
        op.push(0.6 + Math.random() * 0.4);
      }
    });

    // Spine & cross spar particles
    const spinePts = pointsAlongLine(top, bottom, Math.floor(PARTICLE_COUNT * 0.07), 0.015);
    for (let i = 0; i < spinePts.length; i += 3) {
      pos.push(spinePts[i], spinePts[i + 1], spinePts[i + 2]);
      sz.push(2.2 + Math.random() * 1.0);
      op.push(0.7 + Math.random() * 0.3);
    }

    const crossPts = pointsAlongLine(left, right, Math.floor(PARTICLE_COUNT * 0.05), 0.015);
    for (let i = 0; i < crossPts.length; i += 3) {
      pos.push(crossPts[i], crossPts[i + 1], crossPts[i + 2]);
      sz.push(2.2 + Math.random() * 1.0);
      op.push(0.7 + Math.random() * 0.3);
    }

    return {
      positions: new Float32Array(pos),
      sizes: new Float32Array(sz),
      opacities: new Float32Array(op),
    };
  }, []);

  // Store initial positions for animation
  useMemo(() => {
    initialPositions.current = new Float32Array(positions);
  }, [positions]);

  // Gentle breathing/floating animation
  useFrame((state) => {
    if (pointsRef.current && initialPositions.current) {
      const t = state.clock.getElapsedTime();
      const posArray = pointsRef.current.geometry.attributes.position.array;
      const initArray = initialPositions.current;

      for (let i = 0; i < posArray.length; i += 3) {
        const ix = initArray[i];
        const iy = initArray[i + 1];
        const iz = initArray[i + 2];

        // Each particle gets a unique wave based on its position
        const offset = ix * 2.0 + iy * 1.5;
        posArray[i] = ix + Math.sin(t * 0.6 + offset) * 0.015;
        posArray[i + 1] = iy + Math.sin(t * 0.5 + offset * 0.7) * 0.02;
        posArray[i + 2] = iz + Math.sin(t * 0.4 + offset * 1.3) * 0.01;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={KITE_COLOR}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

/* Tail particles — wavy line of particles with bow clusters */
function TailParticles() {
  const pointsRef = useRef();
  const initialPositions = useRef();

  const positions = useMemo(() => {
    const pos = [];

    // Main tail curve
    const tailPoints = [];
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      const y = -2.8 - t * 3.2;
      const x = Math.sin(t * Math.PI * 3) * 0.35 * t;
      const z = t * 0.2;
      tailPoints.push([x, y, z]);
    }

    // Particles along the tail
    for (let i = 0; i < TAIL_PARTICLE_COUNT; i++) {
      const idx = Math.floor(Math.random() * (tailPoints.length - 1));
      const pt = tailPoints[idx];
      const scatter = 0.02 + (idx / tailPoints.length) * 0.03;
      pos.push(
        pt[0] + (Math.random() - 0.5) * scatter,
        pt[1] + (Math.random() - 0.5) * scatter,
        pt[2] + (Math.random() - 0.5) * scatter * 0.5,
      );
    }

    // Bow clusters at intervals
    const bowPositions = [
      [0.15, -3.6], [-0.12, -4.2], [0.2, -4.8], [-0.08, -5.4],
    ];

    bowPositions.forEach(([bx, by]) => {
      for (let i = 0; i < BOW_PARTICLE_COUNT / 4; i++) {
        // Butterfly/bow shape
        const angle = Math.random() * Math.PI * 2;
        const r = 0.08 + Math.random() * 0.1;
        const side = Math.random() > 0.5 ? 1 : -1;
        pos.push(
          bx + Math.cos(angle) * r * side * 1.5,
          by + Math.sin(angle) * r * 0.6,
          0.1 + Math.random() * 0.05,
        );
      }
    });

    return new Float32Array(pos);
  }, []);

  useMemo(() => {
    initialPositions.current = new Float32Array(positions);
  }, [positions]);

  // Tail wave animation
  useFrame((state) => {
    if (pointsRef.current && initialPositions.current) {
      const t = state.clock.getElapsedTime();
      const posArray = pointsRef.current.geometry.attributes.position.array;
      const initArray = initialPositions.current;

      for (let i = 0; i < posArray.length; i += 3) {
        const iy = initArray[i + 1];
        const progress = Math.abs(iy + 2.8) / 3.2; // 0 at kite, 1 at end
        const wave = progress * 0.08;

        posArray[i] = initArray[i] + Math.sin(t * 1.5 + iy * 1.2) * wave;
        posArray[i + 1] = initArray[i + 1] + Math.sin(t * 0.8 + iy * 0.8) * wave * 0.3;
        posArray[i + 2] = initArray[i + 2] + Math.sin(t * 1.0 + iy) * wave * 0.5;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={KITE_COLOR}
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

/* Ambient floating particles around the kite */
function AmbientParticles() {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 200; i++) {
      pos.push(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 3,
      );
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      const posArray = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < posArray.length; i += 3) {
        posArray[i + 1] += Math.sin(t * 0.3 + i) * 0.001;
        posArray[i] += Math.cos(t * 0.2 + i * 0.5) * 0.0005;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={KITE_COLOR}
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </points>
  );
}

/* The whole scene with gentle rotation */
function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.03;
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={0.85} position={[0, 0.5, 0]}>
      <KiteParticles />
      <TailParticles />
      <AmbientParticles />
    </group>
  );
}

/* Main exported component */
export default function PaperKite3D() {
  return (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
