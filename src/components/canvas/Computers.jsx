import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader.jsx';


const Computers = ({isMobile }) => {
  const { scene } = useGLTF('./desktop_pc/scene.gltf'); // Destructure scene from useGLTF

  return (
    <>
       <hemisphereLight intensity={1} groundColor="black" />
      <pointLight intensity={1} /> 
      <spotLight
        intensity={1}
        angle={0.12}
        penumbra={1} // Fixed typo from 'penumber' to 'penumbra'
        position={[-20, 50, 10]}
        castShadow
        shadow-mapSize={{ width: 1024, height: 1024 }} // Correct way to set shadow map size
      />
      <primitive
        object={scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ?[1, -2.7, -1.2] :[0, -3.25, -1.25]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setmobile] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width:700px)');

    const handleMediaQueryChange = (event) => {
      setmobile(event.matches);
    } 

    mediaQuery.addEventListener('change',handleMediaQueryChange);

    return () =>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  },[])
  return (
    <Canvas 
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2} 
        />
        <Computers  isMobile={isMobile}/>
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
