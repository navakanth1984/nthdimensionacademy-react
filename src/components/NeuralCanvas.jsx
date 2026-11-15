import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import GLBModel from './GLBModel';

const curriculumData = [
  {
    id: 'DP-700',
    title: 'Microsoft Fabric Data Engineer',
    status: 'ACTIVE',
    level: 'Elite Master Syllabus',
    modelUrl: '/assets/models/fabric_cube.glb'
  },
  {
    id: 'DP-600',
    title: 'Implementing Analytics Solutions',
    status: 'ACTIVE',
    level: 'Specialist Syllabus',
    modelUrl: '/assets/models/analytics_prism.glb'
  },
  {
    id: 'DP-750',
    title: 'Implement a Lakehouse with Microsoft Fabric',
    status: 'ACTIVE',
    level: 'Specialist Syllabus',
    modelUrl: '/assets/models/analytics_prism.glb'
  },
  {
    id: 'DP-800',
    title: 'Developing AI-Enabled Database Solutions',
    status: 'ACTIVE',
    level: 'Specialist Syllabus',
    modelUrl: '/assets/models/azure_core.glb'
  },
  {
    id: 'DP-203',
    title: 'Azure Data Engineering',
    status: 'RETIRED',
    level: 'Legacy Core Syllabus',
    modelUrl: '/assets/models/azure_core.glb'
  },
  {
    id: 'DP-900',
    title: 'Azure Data Fundamentals',
    status: 'COMING SOON',
    level: 'Foundation Syllabus',
    modelUrl: '/assets/models/azure_sphere.glb'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'ACTIVE': return '#00ffff';
    case 'RETIRED': return '#ff0055';
    case 'COMING SOON': return '#ffd700';
    default: return '#0055ff';
  }
};

const atomTilts = [
  [Math.PI / 4, 0, Math.PI / 4],
  [-Math.PI / 4, 0, Math.PI / 4],
  [Math.PI / 3, Math.PI / 6, -Math.PI / 6],
  [-Math.PI / 3, -Math.PI / 6, Math.PI / 6],
  [Math.PI / 2, Math.PI / 4, 0],
  [0, -Math.PI / 4, Math.PI / 3]
];

const vertices = [
  [-2.2, 1.8, 1.3],
  [2.2, 2.2, -1.8],
  [-2.5, 0, -2.0],
  [2.5, 0, 2.0],
  [-1.8, -2.2, -2.2],
  [1.8, -1.8, 2.2]
];

function OrbitRing({ radius, color }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} opacity={0.25} transparent linewidth={1} />
    </line>
  );
}

function MoleculeBonds({ color }) {
  const lineGeometries = useMemo(() => {
    const geometries = [];
    vertices.forEach((v) => {
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...v)];
      geometries.push(new THREE.BufferGeometry().setFromPoints(pts));
    });
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const pts = [new THREE.Vector3(...vertices[i]), new THREE.Vector3(...vertices[j])];
        geometries.push(new THREE.BufferGeometry().setFromPoints(pts));
      }
    }
    return geometries;
  }, []);

  return (
    <group>
      {lineGeometries.map((geom, index) => (
        <line key={index} geometry={geom}>
          <lineBasicMaterial attach="material" color={color} opacity={0.35} transparent linewidth={1.5} />
        </line>
      ))}
    </group>
  );
}

// Camera tracking logic for mobile tap interaction
function CameraRig({ activeNodeRef }) {
  const centerTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  
  useFrame((state) => {
    if (!state.controls) return;
    
    if (activeNodeRef && activeNodeRef.current) {
      activeNodeRef.current.getWorldPosition(worldPos);
      state.controls.target.lerp(worldPos, 0.08);
    } else {
      state.controls.target.lerp(centerTarget, 0.08);
    }
  });
  return null;
}

function OrbitingNode({ data, mode, index, radius, activeNodeId, setActiveNodeId }) {
  const positionRef = useRef();
  const rotationRef = useRef();
  const shellMaterialRef = useRef();
  const coreMaterialRef = useRef();
  
  const [hovered, setHover] = useState(false);
  const glowColor = getStatusColor(data.status);
  const timeRef = useRef(0);

  const speed = 0.65 - index * 0.08;
  const phaseOffset = index * (Math.PI / 2);

  const isActive = activeNodeId === data.id;

  useFrame((state, delta) => {
    if (!positionRef.current || !rotationRef.current) return;

    if (!hovered && !isActive) {
      timeRef.current += delta;
    }

    // 1. Translation: Handled by the outer positionRef to keep Html stable
    if (mode === 'solar' || mode === 'atom') {
      const t = timeRef.current * speed + phaseOffset;
      const targetX = Math.cos(t) * radius;
      const targetY = 0;
      const targetZ = Math.sin(t) * radius;

      positionRef.current.position.x += (targetX - positionRef.current.position.x) * 0.08;
      positionRef.current.position.y += (targetY - positionRef.current.position.y) * 0.08;
      positionRef.current.position.z += (targetZ - positionRef.current.position.z) * 0.08;
    } else if (mode === 'molecule') {
      const target = vertices[index];
      positionRef.current.position.x += (target[0] - positionRef.current.position.x) * 0.08;
      positionRef.current.position.y += (target[1] - positionRef.current.position.y) * 0.08;
      positionRef.current.position.z += (target[2] - positionRef.current.position.z) * 0.08;
    }

    // 2. Rotation & Scale: Handled by inner rotationRef
    const speedMult = (hovered || isActive) ? 2.5 : 1.0;
    rotationRef.current.rotation.x += delta * 0.2 * speedMult;
    rotationRef.current.rotation.y += delta * 0.3 * speedMult;

    // Smooth hover scaling
    const targetScale = (hovered || isActive) ? 1.35 : 1.0;
    rotationRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // 3. Emissive & Opacity Transitions
    if (shellMaterialRef.current) {
      const targetOpacity = (hovered || isActive) ? 0.45 : 0.08;
      shellMaterialRef.current.opacity += (targetOpacity - shellMaterialRef.current.opacity) * 0.1;
    }
    if (coreMaterialRef.current) {
      const targetEmissive = (hovered || isActive) ? 3.5 : 1.2;
      coreMaterialRef.current.emissiveIntensity += (targetEmissive - coreMaterialRef.current.emissiveIntensity) * 0.1;
    }
  });

  // Notify parent of our position when active for camera tracking
  useEffect(() => {
    if (isActive && window.handleNodeTracking) {
      window.handleNodeTracking(positionRef);
    }
  }, [isActive]);

  return (
    <group 
      ref={positionRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        setHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'default';
        setHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActiveNodeId(isActive ? null : data.id);
        if (window.handleNodeClick) {
          window.handleNodeClick(data.id);
        }
      }}
    >
      {/* Invisible hitbox for mobile taps (Stable in positionRef) */}
      <mesh visible={false}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Rotation Group (Models & Glow) */}
      <group ref={rotationRef}>
        {data.modelUrl ? (
          <group>
            <GLBModel 
              url={data.modelUrl} 
              scale={0.9} 
              fallbackSize={0.55} 
              fallbackColor={glowColor}
            />
            <mesh>
              <icosahedronGeometry args={[0.65, 1]} />
              <meshBasicMaterial
                ref={shellMaterialRef}
                color={glowColor}
                wireframe={true}
                transparent={true}
                opacity={0.08}
              />
            </mesh>
          </group>
        ) : (
          <group>
            <mesh>
              <icosahedronGeometry args={[0.55, 1]} />
              <meshStandardMaterial
                ref={coreMaterialRef}
                color={glowColor}
                wireframe={true}
                transparent={true}
                opacity={0.8}
                emissive={glowColor}
                emissiveIntensity={1.2}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial color={glowColor} transparent opacity={0.6} />
            </mesh>
          </group>
        )}
      </group>

      {/* Tooltip: Rendered outside rotationRef to prevent jitter/orbiting */}
      <Html distanceFactor={10} position={[0, (hovered || isActive) ? 1.6 : 1.3, 0]} center zIndexRange={[100, 0]}>
        <div
          className={`text-white p-4 rounded-xl border backdrop-blur-md whitespace-nowrap transition-all duration-300 pointer-events-none select-none font-sans ${(hovered || isActive) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
          style={{
            background: 'rgba(7, 9, 19, 0.85)',
            borderColor: glowColor,
            boxShadow: (hovered || isActive) ? `0 0 35px ${glowColor}60` : 'none'
          }}
        >
          <h3 className="font-bold text-base mb-1">
            {data.id} Masterclass{' '}
            <span
              style={{ color: glowColor, borderColor: glowColor }}
              className="text-[10px] ml-2 px-2 py-0.5 rounded-full border font-mono"
            >
              {data.status}
            </span>
          </h3>
          <h4 className="font-semibold text-sm text-gray-200">{data.title}</h4>
          <p className="text-[10px] mt-1.5 italic text-gray-400">Level: {data.level}</p>
        </div>
      </Html>
    </group>
  );
}

function CentralHub({ mode }) {
  const hubRef = useRef();
  const cageRef = useRef();
  const [pulse, setPulse] = useState(1);

  useFrame((state, delta) => {
    if (hubRef.current) {
      hubRef.current.rotation.y += delta * 0.1;
    }
    if (cageRef.current) {
      cageRef.current.rotation.y -= delta * 0.15;
      cageRef.current.rotation.x += delta * 0.08;
    }
    setPulse(1 + Math.sin(state.clock.getElapsedTime() * 3.5) * 0.12);
  });

  if (mode === 'solar') {
    return (
      <group>
        <mesh ref={hubRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1.5 * pulse}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        <mesh ref={cageRef}>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshStandardMaterial
            color="#ffd700"
            wireframe
            transparent
            opacity={0.35}
            emissive="#ffd700"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    );
  }

  if (mode === 'atom') {
    const offsets = [
      [0.2, 0.1, 0.1], [-0.2, -0.1, -0.1],
      [-0.1, 0.2, -0.1], [0.1, -0.2, 0.1],
      [-0.12, -0.1, 0.18], [0.12, 0.15, -0.18]
    ];
    return (
      <group ref={hubRef}>
        {offsets.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#a855f7' : '#f43f5e'}
              emissive={idx % 2 === 0 ? '#a855f7' : '#f43f5e'}
              emissiveIntensity={1.3 * pulse}
            />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group>
      <mesh ref={hubRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.2 * pulse}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function NeuralSystem({ mode, children }) {
  const systemGroupRef = useRef();

  useFrame((state, delta) => {
    if (systemGroupRef.current) {
      if (mode === 'molecule') {
        systemGroupRef.current.rotation.x += delta * 0.1;
        systemGroupRef.current.rotation.y += delta * 0.15;
        systemGroupRef.current.rotation.z += delta * 0.05;
      } else {
        systemGroupRef.current.rotation.x += (0 - systemGroupRef.current.rotation.x) * 0.08;
        systemGroupRef.current.rotation.y += (0 - systemGroupRef.current.rotation.y) * 0.08;
        systemGroupRef.current.rotation.z += (0 - systemGroupRef.current.rotation.z) * 0.08;
      }
    }
  });

  return <group ref={systemGroupRef}>{children}</group>;
}

export default function NeuralCanvas({ mode = 'solar' }) {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [activeNodeRef, setActiveNodeRef] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Expose global tracker for nodes to cleanly report their references
  useEffect(() => {
    window.handleNodeTracking = (ref) => setActiveNodeRef(ref);
    window.resetNeuralCanvas = () => {
      setActiveNodeId(null);
      setActiveNodeRef(null);
    };
    return () => { 
      delete window.handleNodeTracking; 
      delete window.resetNeuralCanvas;
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#070913] z-0">
      <Canvas 
        style={{ touchAction: 'none' }}
        camera={{ position: [0, 0, 8.5], fov: 50 }} 
        onPointerMissed={() => { setActiveNodeId(null); setActiveNodeRef(null); }}
      >
        <color attach="background" args={['#070913']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#a855f7" />
        
        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0.5} fade speed={1.2} />

        <CameraRig activeNodeRef={activeNodeRef} />

        <NeuralSystem mode={mode}>
          <CentralHub mode={mode} />
          {mode === 'molecule' && <MoleculeBonds color="#8b5cf6" />}

          {curriculumData.map((course, index) => {
            const radius = 2.4 + index * 1.2;
            const tilt = atomTilts[index];

            if (mode === 'solar') {
              return (
                <group key={course.id}>
                  <OrbitRing radius={radius} color={getStatusColor(course.status)} />
                  <OrbitingNode data={course} mode={mode} index={index} radius={radius} activeNodeId={activeNodeId} setActiveNodeId={setActiveNodeId} />
                </group>
              );
            } else if (mode === 'atom') {
              return (
                <group key={course.id} rotation={tilt}>
                  <OrbitRing radius={radius} color={getStatusColor(course.status)} />
                  <OrbitingNode data={course} mode={mode} index={index} radius={radius} activeNodeId={activeNodeId} setActiveNodeId={setActiveNodeId} />
                </group>
              );
            } else {
              return (
                <OrbitingNode key={course.id} data={course} mode={mode} index={index} activeNodeId={activeNodeId} setActiveNodeId={setActiveNodeId} />
              );
            }
          })}
        </NeuralSystem>

        <OrbitControls 
          makeDefault
          enableDamping={true} 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={mode !== 'molecule' && !activeNodeId} 
          autoRotateSpeed={0.4}
          maxDistance={15}
          minDistance={3.5}
        />
      </Canvas>
    </div>
  );
}
