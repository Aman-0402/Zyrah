import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ── Bottle geometry profiles ─────────────────────────────────────────────── */

function useBottleProfiles() {
  const bodyPoints = useMemo(() => [
    new THREE.Vector2(0.001, -1.90),
    new THREE.Vector2(0.380, -1.86),
    new THREE.Vector2(0.420, -1.72),
    new THREE.Vector2(0.415, -1.50),
    new THREE.Vector2(0.410,  0.38),
    new THREE.Vector2(0.380,  0.70),
    new THREE.Vector2(0.290,  0.94),
    new THREE.Vector2(0.188,  1.14),
    new THREE.Vector2(0.178,  1.40),
  ], [])

  const liquidPoints = useMemo(() => [
    new THREE.Vector2(0.001, -1.84),
    new THREE.Vector2(0.360, -1.80),
    new THREE.Vector2(0.358, -0.08),
    new THREE.Vector2(0.001, -0.08),
  ], [])

  const capPoints = useMemo(() => [
    new THREE.Vector2(0.001,  1.40),
    new THREE.Vector2(0.220,  1.40),
    new THREE.Vector2(0.268,  1.46),
    new THREE.Vector2(0.272,  1.84),
    new THREE.Vector2(0.225,  2.00),
    new THREE.Vector2(0.082,  2.12),
    new THREE.Vector2(0.001,  2.12),
  ], [])

  return { bodyPoints, liquidPoints, capPoints }
}

/* ── Materials ────────────────────────────────────────────────────────────── */

const GLASS_PROPS = {
  color: '#0d0905',
  metalness: 0.04,
  roughness: 0.0,
  transparent: true,
  opacity: 0.88,
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  reflectivity: 1.0,
  envMapIntensity: 3.0,
}

const GOLD_PROPS = {
  color: '#C9A84C',
  metalness: 1.0,
  roughness: 0.10,
  envMapIntensity: 3.0,
}

const LIQUID_PROPS = {
  color: '#3B1F0F',
  metalness: 0.0,
  roughness: 0.25,
  transparent: true,
  opacity: 0.80,
}

/* ── Bottle mesh ──────────────────────────────────────────────────────────── */

function BottleMesh({ mouseRef }) {
  const groupRef = useRef()
  const { bodyPoints, liquidPoints, capPoints } = useBottleProfiles()

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    // Slow continuous Y rotation (0.3 rad/s → full rotation ≈ 21s)
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.3

    // Mouse parallax — gentle tilt toward cursor
    if (mouseRef?.current) {
      const tx = -mouseRef.current.y * 0.14
      const tz = -mouseRef.current.x * 0.07
      groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.04
      groupRef.current.rotation.z += (tz - groupRef.current.rotation.z) * 0.04
    }
  })

  return (
    <Float
      speed={0.9}
      rotationIntensity={0}
      floatIntensity={0.45}
      floatingRange={[-0.07, 0.07]}
    >
      <group ref={groupRef} position={[0, -0.15, 0]}>

        {/* Liquid (rendered first — inside glass) */}
        <mesh renderOrder={0}>
          <latheGeometry args={[liquidPoints, 48]} />
          <meshStandardMaterial {...LIQUID_PROPS} />
        </mesh>

        {/* Glass body */}
        <mesh renderOrder={1}>
          <latheGeometry args={[bodyPoints, 64]} />
          <meshPhysicalMaterial {...GLASS_PROPS} side={THREE.DoubleSide} />
        </mesh>

        {/* Bottom disc */}
        <mesh position={[0, -1.90, 0]} rotation={[Math.PI, 0, 0]} renderOrder={1}>
          <circleGeometry args={[0.38, 64]} />
          <meshPhysicalMaterial {...GLASS_PROPS} />
        </mesh>

        {/* Gold cap */}
        <mesh renderOrder={2}>
          <latheGeometry args={[capPoints, 64]} />
          <meshStandardMaterial {...GOLD_PROPS} />
        </mesh>

        {/* Cap top disc */}
        <mesh position={[0, 2.12, 0]} renderOrder={2}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial color="#E2C27D" metalness={1.0} roughness={0.08} />
        </mesh>

        {/* Spray stem */}
        <mesh position={[0, 2.22, 0]} renderOrder={2}>
          <cylinderGeometry args={[0.038, 0.052, 0.22, 24]} />
          <meshStandardMaterial {...GOLD_PROPS} />
        </mesh>

        {/* Spray nozzle head — horizontal */}
        <mesh position={[0.09, 2.26, 0]} rotation={[0, 0, Math.PI / 2]} renderOrder={2}>
          <cylinderGeometry args={[0.028, 0.028, 0.10, 16]} />
          <meshStandardMaterial {...GOLD_PROPS} />
        </mesh>

        {/* Subtle label plane (gold engraving) */}
        <mesh position={[0, -0.42, 0.412]} renderOrder={3}>
          <planeGeometry args={[0.52, 0.75]} />
          <meshStandardMaterial
            color="#C9A84C"
            metalness={0.6}
            roughness={0.7}
            transparent
            opacity={0.055}
          />
        </mesh>

        {/* Glow orb behind bottle */}
        <mesh position={[0, 0, -0.8]} renderOrder={0}>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial
            color="#C9A84C"
            transparent
            opacity={0.018}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Scene ────────────────────────────────────────────────────────────────── */

export default function PerfumeBottle3D({ mouseRef }) {
  return (
    <>
      {/* HDR environment for reflections */}
      <Environment preset="city" background={false} />

      {/* Ambient */}
      <ambientLight intensity={0.55} />

      {/* Key light — warm gold from upper-left */}
      <pointLight position={[-3.5, 4.5, 2.5]} intensity={5.0} color="#E2C27D" decay={2} />

      {/* Gold rim from right-back */}
      <pointLight position={[3.0, 1.5, -2.0]} intensity={2.5} color="#C9A84C" decay={2} />

      {/* Cool top specular */}
      <pointLight position={[0.5, 5.5, 0.8]} intensity={1.8} color="#ffffff" decay={2.5} />

      {/* Warm base bounce */}
      <pointLight position={[0, -3.5, 1.0]} intensity={1.2} color="#3B1F0F" decay={2} />

      <BottleMesh mouseRef={mouseRef} />

      {/* Gold sparkle particles */}
      <Sparkles
        count={70}
        scale={[2.8, 5.0, 2.8]}
        size={1.1}
        speed={0.22}
        opacity={0.32}
        color="#C9A84C"
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.30}
          luminanceSmoothing={0.85}
          intensity={1.8}
          radius={0.65}
        />
        <Vignette offset={0.22} darkness={0.60} />
      </EffectComposer>
    </>
  )
}
