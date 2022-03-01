import React, { Suspense, useState } from "react";
import "./assets/styles/App.scss";
import { Canvas, useThree } from "react-three-fiber";
import { softShadows, Loader, OrbitControls } from "@react-three/drei";
import Model from "./components/Three/chest";
import Lights from "./components/Three/lights.js";
import Floor from "./components/Three/floor.js";
import { useSpring } from "@react-spring/three";

softShadows();

const ZoomWithOrbital = () => {
  const { gl, camera } = useThree();
  useSpring({
    from: {
      z: 30
    },
    x: -5, 
    y: 4, 
    z: 4,
    onFrame: ({x, y, z}) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    },
  });
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      target={[0,0,0]}
      args={[camera, gl.domElement]}
    />
  )
}

function App() {
  const [open, setOpen] = useState(false);
  return (
   <>
      <Canvas
        colorManagement
        shadows
        camera={{position: [-5, 4, 4], fov:40 }}
      >
        <Lights />
        <Suspense fallback={null}>
          <Model open={open} setOpen={setOpen} />
          <Floor />
          <ZoomWithOrbital />
        </Suspense>
      </Canvas>    
      <Loader />
   </>
  );
}

export default App;
