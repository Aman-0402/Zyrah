import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import PerfumeBottle3D from './PerfumeBottle3D'

function LoadingMesh() {
  return (
    <mesh>
      <cylinderGeometry args={[0.28, 0.34, 3.2, 32]} />
      <meshStandardMaterial color="#C9A84C" transparent opacity={0.06} />
    </mesh>
  )
}

export default function Bottle3DCanvas({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 5.8], fov: 38 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={<LoadingMesh />}>
        <PerfumeBottle3D mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  )
}
