import React, { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';

class GLBErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("GLB Model load failed, falling back to wireframe:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function FallbackMesh({ size = 0.5, color = '#00ffff' }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function ActualModel({ url, scale = 1 }) {
  // useGLTF loads and caches the GLB asset
  const { scene } = useGLTF(url);
  
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} />;
}

export default function GLBModel({ url, fallbackSize = 0.5, fallbackColor = '#00ffff', scale = 1, fallbackMesh }) {
  const finalFallback = fallbackMesh || <FallbackMesh size={fallbackSize} color={fallbackColor} />;
  return (
    <GLBErrorBoundary fallback={finalFallback}>
      <Suspense fallback={<FallbackMesh size={fallbackSize} color={fallbackColor} />}>
        <Center>
          <ActualModel url={url} scale={scale} />
        </Center>
      </Suspense>
    </GLBErrorBoundary>
  );
}
