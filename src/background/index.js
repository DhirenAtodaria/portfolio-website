import React, { useRef } from "react";
import { Canvas, useFrame, useResource, useThree } from "react-three-fiber";
import {
    useGLTF,
    OrbitControls,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    useHelper,
    CameraShake,
} from "@react-three/drei";
import deer from "./deer.glb";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import {
    DirectionalLightHelper,
    MeshPhongMaterial,
    PointLightHelper,
    SpotLightHelper,
} from "three";
import * as Images from "./cube";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";

const urls = [Images.px, Images.nx, Images.py, Images.ny, Images.pz, Images.nz];

const reflection = new THREE.CubeTextureLoader().load(urls);

const Deer = () => {
    const mesh = useRef();
    const {
        nodes: { Deer: deerGeo },
    } = useGLTF(deer, true);

    return (
        <mesh
            ref={mesh}
            name={"deer"}
            geometry={deerGeo.geometry}
            rotation={[0, 0, 0]}
        >
            <meshStandardMaterial
                envMap={reflection}
                // bumpMap={bumpMap}
                // color={"#53687E"}
                roughness={0.05}
                metalness={1}
                clearcoat={1}
                clearcoatRoughness={1}
                // wireframe
            />
        </mesh>
    );
};

const Light = () => {
    const pointLightRef = useResource();
    const pointLightRef2 = useResource();
    const pointLightRef3 = useResource();

    useHelper(pointLightRef, PointLightHelper, 5.5, "white");

    useFrame((state, delta) => {
        // pointLightRef.current.position.x += Math.sin(
        //     state.clock.getElapsedTime()
        // );
        // pointLightRef2.current.position.x += Math.cos(
        //     state.clock.getElapsedTime()
        // );
        // pointLightRef3.current.position.z += Math.sin(
        //     state.clock.getElapsedTime()
        // );
        // state.camera.lookAt(20, 20, 0);
    });

    return (
        <>
            <pointLight
                ref={pointLightRef}
                color={"hotpink"}
                intensity={100}
                position={[0, 50, 0]}
            />
            {/* <pointLight
                ref={pointLightRef2}
                color={"white"}
                intensity={100}
                position={[0, 50, 0]}
            />
            <pointLight
                ref={pointLightRef3}
                color={"blue"}
                intensity={1000}
                position={[0, 50, 0]}
            />
            <pointLight color={"orange"} intensity={1} position={[0, -50, 0]} /> */}
            {/* <spotLight
                ref={lightRef}
                intensity={0.5}
                angle={0.3}
                penumbra={1}
            /> */}
        </>
    );
};

const config = {
    maxYaw: 100.1,
    maxPitch: 100.1,
    maxRoll: 100.1,
    yawFrequency: 100,
    pitchFrequency: 100,
    rollFrequency: 100,
    intensity: 100,
    decay: false,
};

function Background() {
    const cameraRig = useRef();

    return (
        <Canvas
            camera={{
                near: 1,
                far: 10000,
                position: [102, 10, 70],
                fov: 25,
            }}
        >
            <CameraShake {...config} ref={cameraRig} />
            <color attach="background" args={["#000000"]} />
            {/* <fog color="#161616" attach="fog" near={8} far={100} /> */}
            <Light />
            <OrbitControls />
            <ambientLight intensity={0.1} />
            <React.Suspense fallback={null}>
                <Deer />
            </React.Suspense>
        </Canvas>
    );
}

export default Background;
