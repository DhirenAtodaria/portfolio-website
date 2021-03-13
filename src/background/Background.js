import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useResource } from "react-three-fiber";
import { useGLTF, CameraShake, OrbitControls } from "@react-three/drei";
import deer from "./deerRotated.glb";
import * as THREE from "three";
import {
    EffectComposer,
    Bloom,
    Vignette,
    ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as Images from "./cube";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { css } from "@emotion/css";
import AnimationHandler from "./AnimationHandler";

const urls = [Images.px, Images.nx, Images.py, Images.ny, Images.pz, Images.nz];

const reflection = new THREE.CubeTextureLoader().load(urls);

const Deer = React.memo(() => {
    const mesh = useRef();
    const {
        nodes: { Deer: deerGeo },
    } = useGLTF(deer, true);

    return (
        <mesh ref={mesh} name={"deer"} geometry={deerGeo.geometry}>
            <meshStandardMaterial
                envMap={reflection}
                roughness={0.025}
                metalness={1}
                emissive={0x000000}
            />
        </mesh>
    );
});

const Light = React.memo(() => {
    const pointLightRef = useResource();
    const pointLightRef2 = useResource();
    const pointLightRef3 = useResource();

    let t = 0;

    useFrame(() => {
        t += 0.0065;

        pointLightRef.current.position.y = 120 * Math.sin(t);
        pointLightRef.current.position.z = 120 * Math.cos(t);
        pointLightRef3.current.position.y = -120 * Math.sin(t);
        pointLightRef3.current.position.z = -120 * Math.cos(t);
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
});

const config = {
    maxYaw: 0.0125,
    maxPitch: 0.0125,
    maxRoll: 0,
    yawFrequency: 0.1,
    pitchFrequency: 0.1,
    rollFrequency: 0,
};

const CameraShakeWithOrbitScene = React.memo(({ cfg, controls }) => {
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
});

function Background({ titleRef, descRef }) {
    const controls = useResource();
    const [listener, setListen] = useState(false);
    const [section, setSection] = useState({
        currentPage: 0,
        previousPage: null,
    });

    return (
        <ReactScrollWheelHandler
            upHandler={(e) => {
                console.log("scroll up");
                if (section.currentPage > 0) {
                    setSection({
                        currentPage: section.currentPage - 1,
                        previousPage: section.currentPage,
                    });
                    setListen(true);
                }
            }}
            downHandler={(e) => {
                console.log("scroll down");
                if (section.currentPage < 1) {
                    setSection({
                        currentPage: section.currentPage + 1,
                        previousPage: section.currentPage,
                    });
                    setListen(true);
                }
            }}
            className={css`
                width: 100%;
                height: 100%;
            `}
            pauseListeners={listener}
        >
            <Canvas
                camera={{
                    near: 1,
                    far: 10000,
                    position: [-70, -4, 114],
                    fov: 25,
                }}
            >
                <CameraShakeWithOrbitScene
                    cfg={{ ...config }}
                    controls={controls}
                />
                <color attach="background" args={["#000000"]} />
                <fog color="#161616" attach="fog" near={110} far={400} />
                <Light />
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
                    {/* <ChromaticAberration offset={[0.0005, 0.001]} /> */}
                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposer>
                <AnimationHandler
                    section={section}
                    listener={listener}
                    titleRef={titleRef}
                    descRef={descRef}
                    setListen={setListen}
                />
            </Canvas>
        </ReactScrollWheelHandler>
    );
}

export default Background;
