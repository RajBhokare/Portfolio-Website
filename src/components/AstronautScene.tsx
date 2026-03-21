import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'

/* ── Procedural astronaut made from Three.js primitives ── */
function AstronautMesh() {
  const group = useRef<THREE.Group>(null!)
  const leftArm = useRef<THREE.Group>(null!)
  const rightArm = useRef<THREE.Group>(null!)
  const leftLeg = useRef<THREE.Group>(null!)
  const rightLeg = useRef<THREE.Group>(null!)
  const visor = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()

  const mat = {
    suit:   new THREE.MeshStandardMaterial({ color: '#e8e8f4', roughness: 0.3, metalness: 0.1 }),
    accent: new THREE.MeshStandardMaterial({ color: '#00e5ff', roughness: 0.2, metalness: 0.6, emissive: '#00e5ff', emissiveIntensity: 0.4 }),
    visor:  new THREE.MeshStandardMaterial({ color: '#00e5ff', roughness: 0, metalness: 1, transparent: true, opacity: 0.7, emissive: '#0088bb', emissiveIntensity: 0.5 }),
    dark:   new THREE.MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.5, metalness: 0.3 }),
    gold:   new THREE.MeshStandardMaterial({ color: '#ffd166', roughness: 0.3, metalness: 0.7, emissive: '#ffd166', emissiveIntensity: 0.2 }),
  }

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!group.current) return

    // Subtle head tracking toward mouse
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y, pointer.x * 0.4, 0.05
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x, -pointer.y * 0.15, 0.05
    )

    // Breathing / idle sway
    group.current.position.y = Math.sin(t * 0.6) * 0.04

    // Arm swing
    if (leftArm.current)  leftArm.current.rotation.x  = Math.sin(t * 0.8) * 0.18
    if (rightArm.current) rightArm.current.rotation.x = Math.sin(t * 0.8 + Math.PI) * 0.18
    if (leftLeg.current)  leftLeg.current.rotation.x  = Math.sin(t * 0.8 + Math.PI) * 0.1
    if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t * 0.8) * 0.1

    // Visor glow pulse
    if (visor.current) {
      const m = visor.current.material as THREE.MeshStandardMaterial
      m.emissiveIntensity = 0.4 + Math.sin(t * 1.5) * 0.2
    }
  })

  return (
    <group ref={group} position={[0, 0, 0]} scale={1.15}>
      {/* ── TORSO ── */}
      <mesh material={mat.suit} castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.72, 0.9, 0.5, 1, 1, 1]} />
      </mesh>
      {/* chest accent stripe */}
      <mesh material={mat.accent} position={[0, 0.1, 0.26]}>
        <boxGeometry args={[0.4, 0.08, 0.02]} />
      </mesh>
      {/* backpack */}
      <mesh material={mat.dark} position={[0, 0.05, -0.32]}>
        <boxGeometry args={[0.5, 0.65, 0.18]} />
      </mesh>
      {/* backpack thruster circles */}
      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} material={mat.accent} position={[x, -0.15, -0.42]}>
          <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
        </mesh>
      ))}

      {/* ── HEAD ── */}
      <group position={[0, 0.72, 0]}>
        {/* helmet */}
        <mesh material={mat.suit} castShadow>
          <sphereGeometry args={[0.32, 32, 32]} />
        </mesh>
        {/* visor */}
        <mesh ref={visor} material={mat.visor} position={[0, 0, 0.18]}>
          <sphereGeometry args={[0.22, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        </mesh>
        {/* helmet ring */}
        <mesh material={mat.dark} position={[0, -0.26, 0]}>
          <torusGeometry args={[0.28, 0.04, 8, 32]} />
        </mesh>
        {/* antenna */}
        <mesh material={mat.gold} position={[0.22, 0.28, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
        </mesh>
        <mesh material={mat.accent} position={[0.22, 0.4, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
      </group>

      {/* ── LEFT ARM ── */}
      <group ref={leftArm} position={[0.46, 0.25, 0]}>
        <mesh material={mat.suit} position={[0.18, -0.22, 0]}>
          <capsuleGeometry args={[0.1, 0.38, 8, 16]} />
        </mesh>
        {/* glove */}
        <mesh material={mat.dark} position={[0.18, -0.5, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
        </mesh>
        {/* arm badge */}
        <mesh material={mat.accent} position={[0.08, -0.15, 0.1]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
        </mesh>
      </group>

      {/* ── RIGHT ARM ── */}
      <group ref={rightArm} position={[-0.46, 0.25, 0]}>
        <mesh material={mat.suit} position={[-0.18, -0.22, 0]}>
          <capsuleGeometry args={[0.1, 0.38, 8, 16]} />
        </mesh>
        <mesh material={mat.dark} position={[-0.18, -0.5, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
        </mesh>
      </group>

      {/* ── LEFT LEG ── */}
      <group ref={leftLeg} position={[0.2, -0.55, 0]}>
        <mesh material={mat.suit} position={[0, -0.28, 0]}>
          <capsuleGeometry args={[0.12, 0.45, 8, 16]} />
        </mesh>
        {/* boot */}
        <mesh material={mat.dark} position={[0, -0.6, 0.04]}>
          <boxGeometry args={[0.22, 0.14, 0.3]} />
        </mesh>
      </group>

      {/* ── RIGHT LEG ── */}
      <group ref={rightLeg} position={[-0.2, -0.55, 0]}>
        <mesh material={mat.suit} position={[0, -0.28, 0]}>
          <capsuleGeometry args={[0.12, 0.45, 8, 16]} />
        </mesh>
        <mesh material={mat.dark} position={[0, -0.6, 0.04]}>
          <boxGeometry args={[0.22, 0.14, 0.3]} />
        </mesh>
      </group>

      {/* shoulder pads */}
      {[0.42, -0.42].map((x, i) => (
        <mesh key={i} material={mat.suit} position={[x, 0.38, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Floating debris / small objects around the astronaut ── */
function SpaceDebris() {
  const debris = useRef<THREE.Group>(null!)
  const items = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2 - 1
      ),
      rotation: Math.random() * Math.PI,
      speed: 0.2 + Math.random() * 0.5,
      size: 0.02 + Math.random() * 0.06,
      type: i % 3,
    })), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!debris.current) return
    debris.current.children.forEach((child, i) => {
      const d = items[i]
      child.position.x = d.position.x + Math.sin(t * d.speed + i) * 0.15
      child.position.y = d.position.y + Math.cos(t * d.speed * 0.7 + i) * 0.12
      child.rotation.x = t * d.speed * 0.5
      child.rotation.y = t * d.speed * 0.3
    })
  })

  const mat = new THREE.MeshStandardMaterial({ color: '#00e5ff', roughness: 0.3, metalness: 0.8, emissive: '#004455', emissiveIntensity: 0.3 })

  return (
    <group ref={debris}>
      {items.map((d, i) => (
        <mesh key={i} position={d.position} material={mat}>
          {d.type === 0 && <boxGeometry args={[d.size, d.size, d.size]} />}
          {d.type === 1 && <octahedronGeometry args={[d.size]} />}
          {d.type === 2 && <tetrahedronGeometry args={[d.size]} />}
        </mesh>
      ))}
    </group>
  )
}

/* ── Orbit ring ── */
function OrbitRing() {
  const ring = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (ring.current) {
      ring.current.rotation.z = state.clock.elapsedTime * 0.25
      ring.current.rotation.x = Math.PI / 2.4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })
  return (
    <mesh ref={ring} position={[0, 0, 0]}>
      <torusGeometry args={[1.8, 0.008, 8, 120]} />
      <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} transparent opacity={0.35} />
    </mesh>
  )
}

/* ── Glowing planet in background ── */
function Planet() {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (mesh.current) mesh.current.rotation.y = state.clock.elapsedTime * 0.04
  })
  return (
    <mesh ref={mesh} position={[2.8, -1.2, -3]}>
      <sphereGeometry args={[1.1, 64, 64]} />
      <meshStandardMaterial
        color="#0a0a2e"
        roughness={0.8}
        emissive="#1a0a4e"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

/* ── Main exported scene ── */
export default function AstronautScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#00e5ff" />
      <pointLight position={[3, -2, -2]} intensity={0.8} color="#b069ff" />
      <pointLight position={[0, -3, 1]} intensity={0.5} color="#ff4d6d" />

      {/* Stars */}
      <Stars radius={80} depth={60} count={3000} factor={3} saturation={0.3} fade speed={0.5} />

      {/* Background planet */}
      <Planet />

      {/* Floating astronaut */}
      <Float
        speed={1.4}
        rotationIntensity={0.2}
        floatIntensity={0.6}
        floatingRange={[-0.12, 0.12]}
      >
        <AstronautMesh />
      </Float>

      {/* Orbit ring around astronaut */}
      <OrbitRing />

      {/* Space debris */}
      <SpaceDebris />
    </>
  )
}
