import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useResource } from "react-three-fiber";
import {
    useGLTF,
    CameraShake,
    Reflector,
    OrbitControls,
} from "@react-three/drei";
import deer from "./deer.glb";
import * as THREE from "three";
import {
    EffectComposer,
    Bloom,
    Vignette,
    ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as Images from "./cube";

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
                roughness={0.025}
                metalness={1}
                emissive={0x000000}
            />
        </mesh>
    );
};

const ReflectorScene = ({ blur, depthScale, distortion, normalScale }) => {
    return (
        <Reflector
            resolution={1024}
            args={[1000, 1000]}
            position={[0, -60, 0]}
            mirror={0.51}
            mixBlur={10}
            mixStrength={2}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            blur={blur || [0, 0]}
            minDepthThreshold={0.8}
            maxDepthThreshold={1.2}
            depthScale={depthScale || 0}
            depthToBlurRatioBias={0.2}
            debug={0}
            distortion={0}
        >
            {(Material, props) => (
                <Material
                    color="#a0a0a0"
                    metalness={0.99}
                    roughness={0}
                    {...props}
                />
            )}
        </Reflector>
    );
};

const Light = () => {
    const pointLightRef = useResource();
    const pointLightRef2 = useResource();
    const pointLightRef3 = useResource();

    let t = 0;

    useFrame(() => {
        t += 0.0065;

        pointLightRef.current.position.y = 60 * Math.sin(t);
        pointLightRef.current.position.z = 60 * Math.cos(t);
        pointLightRef3.current.position.y = -60 * Math.sin(t);
        pointLightRef3.current.position.z = -60 * Math.cos(t);
    });

    return (
        <>
            <pointLight
                ref={pointLightRef}
                color={0x3402ff}
                intensity={100}
                position={[0, 0, 0]}
            />
            <pointLight
                ref={pointLightRef2}
                color={0xbfd7ea}
                intensity={100}
                position={[0, 50, 0]}
            />
            <pointLight
                ref={pointLightRef3}
                color={0xf72585}
                intensity={100}
                position={[0, 50, 0]}
            />
        </>
    );
};

const config = {
    maxYaw: 0.01,
    maxPitch: 0.01,
    maxRoll: 0,
    yawFrequency: 0.1,
    pitchFrequency: 0.1,
    rollFrequency: 0,
};

function CameraShakeWithOrbitScene({ cfg }) {
    const controls = useResource();

    useEffect(() => {
        controls.current.target = new THREE.Vector3(20, 20, 0);
    }, [controls]);

    return (
        <>
            <React.Suspense fallback={null}>
                <OrbitControls ref={controls} enabled={false} />
                <CameraShake {...cfg} additive />
            </React.Suspense>
        </>
    );
}

function Background() {
    return (
        <Canvas
            camera={{
                near: 1,
                far: 10000,
                position: [90, 0, 81],
                fov: 25,
            }}
        >
            <CameraShakeWithOrbitScene cfg={{ ...config }} />
            <color attach="background" args={["#000000"]} />
            <fog color="#161616" attach="fog" near={8} far={200} />
            <Light />
            <ReflectorScene />

            <ambientLight intensity={0.1} />
            <React.Suspense fallback={null}>
                <Deer />
            </React.Suspense>
            <EffectComposer>
                <Bloom
                    luminanceThreshold={1}
                    luminanceSmoothing={0.9}
                    intensity={200}
                    blendFunction={BlendFunction.AdditiveBlending}
                    height={1000}
                />

                <ChromaticAberration offset={[0.0005, 0.001]} />
                <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer>
        </Canvas>
    );
}

export default Background;
