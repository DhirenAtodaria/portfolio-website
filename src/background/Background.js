import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useResource, useThree } from "react-three-fiber";
import {
    useGLTF,
    OrbitControls,
    Icosahedron,
    Octahedron,
    Torus,
    MeshDistortMaterial,
} from "@react-three/drei";
import { random } from "lodash";
import { CameraShake } from "./CustomCameraShake";
import * as THREE from "three";
import {
    EffectComposer,
    Bloom,
    Vignette,
    DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as ModelAssets from "./cube";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { css } from "@emotion/css";
import AnimationHandler from "./AnimationHandler";
import isMobile from "is-mobile";
import ReactGA from "react-ga";

const cube = ModelAssets.cube;

const Instances = ({ material }) => {
    const [sphereRefs] = useState(() => []);
    const initialPositions = [
        [-35, -10, 35],
        [-35, 25, 35],
        [-30, -5, -45],
        [-26, -20, -15],
        [-20, 4, -10],
        [-11, 0, -78],
        [-10, 12, -4],
        [8, 10, 20],
        [7, 10, -15],
        [20, 3, -54],
        [41, 7, -95],
        [10, 4, 35],
        [67, -22, -23],
        [75, -7, -20],
        [78, -17, -80],
        [80, 10, 20],
        [95, -8, 35],
        [50, -11, 35],
        [45, -4, 50],
        [14, -2, 55],
    ];
    const rotationFactorArray = Array(20)
        .fill()
        .map(() =>
            random(0, 100) > 80 ? random(0.09, 0.1) : random(0.01, 0.04)
        );

    useFrame(() => {
        sphereRefs.forEach((el, index) => {
            el.position.y += rotationFactorArray[index];
            if (el.position.y > 60) el.position.y = -18;
            el.rotation.x += 0.01;
            el.rotation.y += 0.01;
        });
    });

    return (
        <>
            {initialPositions.map((pos, index) => {
                const randomNumber = random(1, 3);
                const commonProps = {
                    position: [pos[0], pos[1], pos[2]],
                    material: material,
                    key: index,
                    ref: (ref) => (sphereRefs[index] = ref),
                };
                if (randomNumber === 1) {
                    return <Icosahedron args={[1.1, 4]} {...commonProps} />;
                } else if (randomNumber === 2) {
                    return <Torus args={[0.5, 0.3, 64, 16]} {...commonProps} />;
                } else {
                    return <Octahedron args={[1.5]} {...commonProps} />;
                }
            })}
        </>
    );
};

const BubblesBackground = React.memo(() => {
    const matRef = useResource();

    return (
        <>
            <MeshDistortMaterial
                ref={matRef}
                color={"#010101"}
                roughness={1}
                metalness={1}
                radius={1}
                distort={0.5}
                wireframe
            />
            {matRef.current && <Instances material={matRef.current} />}
        </>
    );
});

const Cube = React.memo(() => {
    const mesh = useRef();
    const {
        nodes: { Deer: cubeGeo },
    } = useGLTF(cube, true);

    useFrame(() => {
        mesh.current.rotation.x += 0.001;
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.z += 0.001;
    });

    return (
        <mesh
            ref={mesh}
            name={"cube"}
            geometry={cubeGeo.geometry}
            position={[-10, 20, 0]}
        >
            <meshPhysicalMaterial
                clearcoat={1}
                clearcoatRoughness={0}
                roughness={0.1}
                metalness={1}
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
            <pointLight intensity={50} />
        </>
    );
});

const CameraShakeWithOrbitScene = React.memo(
    ({ cfg, controls, frequencyFactor }) => {
        useEffect(() => {
            controls.current.target = new THREE.Vector3(20, 20, 0);
        }, [controls]);

        return (
            <>
                <React.Suspense fallback={null}>
                    <OrbitControls ref={controls} enabled={false} />
                    <CameraShake
                        {...cfg}
                        frequencyFactor={frequencyFactor}
                        additive
                    />
                </React.Suspense>
            </>
        );
    }
);

const config = {
    maxYaw: 0.0125,
    maxPitch: 0.0125,
    maxRoll: 0,
    rollFrequency: 0,
    yawFrequency: 0.1,
    pitchFrequency: 0.1,
    intensity: 1,
};

function Background({
    titleRef,
    aboutRef,
    workRef,
    sectionRef,
    contactRef,
    iconRef,
    footerIconRef,
    section,
    setSection,
    loading,
}) {
    const mobile = isMobile({ tablet: true });
    const controls = useResource();
    const [listener, setListen] = useState(true);

    const [animating, setAnimating] = useState(true);
    const spinFactor = useRef(0.0065);
    const zoomFactor = useRef(1.0);
    const frequencyFactor = useRef(0.1);
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
                1.15,
                0.025
            );

            frequencyFactor.current = THREE.MathUtils.lerp(
                frequencyFactor.current,
                5,
                0.05
            );
        }
    }, [animating]);

    const upClickHandler = useCallback(() => {
        if (!animating) {
            spinFactor.current = THREE.MathUtils.lerp(
                spinFactor.current,
                0.0065,
                0.05
            );

            zoomFactor.current = THREE.MathUtils.lerp(
                zoomFactor.current,
                1.0,
                0.075
            );

            frequencyFactor.current = THREE.MathUtils.lerp(
                frequencyFactor.current,
                0.1,
                0.5
            );
        }
    }, [animating]);

    return (
        <ReactScrollWheelHandler
            upHandler={() => {
                if (section.currentPage > 0) {
                    ReactGA.event({
                        category: "Scroll",
                        action: "Scrolled Up",
                        label: `User Scrolled to section - ${section.currentPage}`,
                    });
                    setSection({
                        currentPage: section.currentPage - 1,
                        previousPage: section.currentPage,
                    });
                    setListen(true);
                    setAnimating(true);
                }
            }}
            downHandler={() => {
                if (section.currentPage < 3) {
                    ReactGA.event({
                        category: "Scroll",
                        action: "Scrolled Down",
                        label: `User Scrolled to section - ${section.currentPage}`,
                    });
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
                {...(!mobile
                    ? {
                          onPointerDown: () => {
                              setListen(true);
                              clearInterval(timer.current);
                              timer.current = setInterval(
                                  downClickHandler,
                                  16.6
                              );
                          },
                          onPointerUp: () => {
                              setListen(false);
                              clearInterval(timer.current);
                              timer.current = setInterval(upClickHandler, 16.6);
                          },
                      }
                    : {})}
            >
                <BubblesBackground />
                <CameraShakeWithOrbitScene
                    cfg={{ ...config }}
                    frequencyFactor={frequencyFactor}
                    controls={controls}
                />
                <color attach="background" args={["#000000"]} />
                <fog color="#000000" attach="fog" near={110} far={400} />
                <Light spinFactor={spinFactor} zoomFactor={zoomFactor} />
                <ambientLight intensity={0.1} />
                <React.Suspense fallback={null}>
                    <Cube />
                </React.Suspense>
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={1}
                        luminanceSmoothing={0.9}
                        intensity={2000}
                        blendFunction={BlendFunction.AdditiveBlending}
                        height={1000}
                    />
                    <DepthOfField
                        focusDistance={0}
                        focalLength={0.04}
                        bokehScale={2}
                        height={480}
                    />

                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposer>
                <AnimationHandler
                    section={section}
                    listener={listener}
                    titleRef={titleRef}
                    aboutRef={aboutRef}
                    workRef={workRef}
                    sectionRef={sectionRef}
                    contactRef={contactRef}
                    iconRef={iconRef}
                    footerIconRef={footerIconRef}
                    setListen={setListen}
                    setAnimating={setAnimating}
                    loading={loading}
                />
            </Canvas>
        </ReactScrollWheelHandler>
    );
}

export default Background;
