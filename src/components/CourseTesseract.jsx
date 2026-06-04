import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export default function CourseTesseract({ data }) {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return '#00ffff';
      case 'RETIRED': return '#ff0055';
      case 'COMING SOON': return '#ffd700';
      default: return '#0055ff';
    }
  };

  const glowColor = getStatusColor(data.status);

  return (
    <group position={data.position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => {
            document.body.style.cursor = 'pointer';
            setHover(true);
        }} 
        onPointerOut={() => {
            document.body.style.cursor = 'default';
            setHover(false);
        }}
        onClick={() => {
            if(data.id === 'DP-700') window.location.href = 'https://nthdimensionacademy.com/dp700-atlas/';
            if(data.id === 'DP-600') window.location.href = 'https://nthdimensionacademy.com/dp600-atlas/';
        }}
      >
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial 
          color={glowColor} 
          wireframe={true} 
          transparent={true}
          opacity={0.8}
          emissive={glowColor}
          emissiveIntensity={hovered ? 2.5 : 1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.5} />
      </mesh>

      {hovered && (
        <Html distanceFactor={10} position={[0, 1.2, 0]} center zIndexRange={[100, 0]}>
          <div className="text-white p-4 rounded-xl border backdrop-blur-md whitespace-nowrap transition-all duration-300"
               style={{
                   background: 'rgba(7, 9, 19, 0.75)',
                   borderColor: glowColor,
                   boxShadow: `0 0 20px ${glowColor}40`
               }}>
            <h3 className="font-bold text-lg mb-1">{data.id} Masterclass <span style={{color: glowColor, borderColor: glowColor}} className="text-xs ml-2 px-2 py-0.5 rounded-full border">{data.status}</span></h3>
            <h4 className="font-semibold text-gray-200">{data.title}</h4>
            <p className="text-xs mt-2 italic text-gray-400">Level: {data.level}</p>
          </div>
        </Html>
      )}
    </group>
  );
}
