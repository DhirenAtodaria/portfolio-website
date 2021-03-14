import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useResource, useThree } from "react-three-fiber";
import { useGLTF, CameraShake, OrbitControls } from "@react-three/drei";
import deer from "./deerRotated.glb";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
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

const Light = React.memo(({ spinFactor, zoomFactor }) => {
    const pointLightRef = useResource();
    const pointLightRef2 = useResource();
    const pointLightRef3 = useResource();
    const { camera } = useThree();

    let t = 0;

    useFrame(() => {
        t += spinFactor.current;

        camera.zoom = zoomFactor.current;
        camera.updateProjectionMatrix();

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

function Background({ titleRef, aboutRef, section, setSection }) {
    const controls = useResource();
    const [listener, setListen] = useState(false);

    const [animating, setAnimating] = useState(false);
    const spinFactor = useRef(0.0065);
    const zoomFactor = useRef(1.0);
    const timer = useRef(null);

    const downClickHandler = useCallback(() => {
        if (!animating) {
            spinFactor.current = THREE.MathUtils.lerp(
                spinFactor.current,
                0.25,
                0.01
            );

            zoomFactor.current = THREE.MathUtils.lerp(
                zoomFactor.current,
                1.1,
                0.005
            );
        }
    }, [animating]);

    const upClickHandler = useCallback(() => {
        if (!animating) {
            spinFactor.current = THREE.MathUtils.lerp(
                spinFactor.current,
                0.0065,
                0.01
            );

            zoomFactor.current = THREE.MathUtils.lerp(
                zoomFactor.current,
                1.0,
                0.005
            );
        }
    }, [animating]);

    return (
        <ReactScrollWheelHandler
            upHandler={(e) => {
                if (section.currentPage > 0) {
                    setSection({
                        currentPage: section.currentPage - 1,
                        previousPage: section.currentPage,
                    });
                    setListen(true);
                    setAnimating(true);
                }
            }}
            downHandler={(e) => {
                if (section.currentPage < 2) {
                    setSection({
                        currentPage: section.currentPage + 1,
                        previousPage: section.currentPage,
                    });
                    setListen(true);
                    setAnimating(true);
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
                onPointerDown={(e) => {
                    setListen(true);
                    clearInterval(timer.current);
                    timer.current = setInterval(downClickHandler, 16.6);
                }}
                onPointerUp={(e) => {
                    setListen(false);
                    clearInterval(timer.current);
                    timer.current = setInterval(upClickHandler, 16.6);
                }}
            >
                <CameraShakeWithOrbitScene
                    cfg={{ ...config }}
                    controls={controls}
                />
                <color attach="background" args={["#000000"]} />
                <fog color="#161616" attach="fog" near={110} far={400} />
                <Light spinFactor={spinFactor} zoomFactor={zoomFactor} />
                <ambientLight intensity={0.1} />
                <React.Suspense fallback={null}>
                    <Deer />
                </React.Suspense>
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={1}
                        luminanceSmoothing={0.9}
                        intensity={2000}
                        blendFunction={BlendFunction.AdditiveBlending}
                        height={1000}
                    />
                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposer>
                <AnimationHandler
                    section={section}
                    listener={listener}
                    titleRef={titleRef}
                    aboutRef={aboutRef}
                    setListen={setListen}
                    setAnimating={setAnimating}
                />
            </Canvas>
        </ReactScrollWheelHandler>
    );
}

export default Background;
