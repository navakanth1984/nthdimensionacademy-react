import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import CourseTesseract from './CourseTesseract';

const curriculumData = [
  {
    id: 'DP-700',
    title: 'Microsoft Fabric Data Engineer',
    status: 'ACTIVE',
    level: 'Elite Master Syllabus',
    position: [-3, 1, 0] 
  },
  {
    id: 'DP-600',
    title: 'Implementing Analytics Solutions',
    status: 'ACTIVE',
    level: 'Specialist Syllabus',
    position: [-1, 2.5, -2]
  },
  {
    id: 'DP-203',
    title: 'Azure Data Engineering',
    status: 'RETIRED',
    level: 'Legacy Core Syllabus',
    position: [2, 0, -1]
  },
  {
    id: 'DP-900',
    title: 'Azure Data Fundamentals',
    status: 'COMING SOON',
    level: 'Foundation Syllabus',
    position: [1, -2, 1]
  }
];

export default function NeuralCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#070913] z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#070913']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {curriculumData.map((course) => (
          <CourseTesseract key={course.id} data={course} />
        ))}

        <OrbitControls 
          enableDamping={true} 
          enablePan={false} 
          enableZoom={true} 
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxDistance={15}
          minDistance={3}
        />
      </Canvas>
    </div>
  );
}
