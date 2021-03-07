import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useResource, useThree } from "react-three-fiber";
import {
    useGLTF,
    CameraShake,
    Reflector,
    OrbitControls,
} from "@react-three/drei";
import { gsap, Power1 } from "gsap";
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
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { css } from "@emotion/css";

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

function CameraShakeWithOrbitScene({ cfg, controls }) {
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

const AnimationHandler = ({ section, listener, controls }) => {
    const { camera, scene } = useThree();

    // useFrame(() => {
    //     camera.position.x += 0.05;
    // });

    useEffect(() => {
        console.log(section);
        console.log(camera);
        if (section === 1) {
            const deerAni = gsap.timeline();
            deerAni.addLabel("bodyMove");
            deerAni.to(camera, {
                zoom: 0.9,
                duration: 0.5,
                ease: Power1.easeOut,
                onUpdate: function () {
                    camera.updateProjectionMatrix();
                },
            });
            deerAni.to(camera.position, {
                x: 138,
                // y: 13.7,
                // z: -113.5,
                duration: 4,
                ease: Power1.easeOut,
                onUpdate: function () {},
            });
            // meshAni.to(mesh.current.scale, {
            //     x: 4,
            //     y: 4,
            //     z: 4,
            //     duration: 2,
            //     ease: Power1.easeOut,
            // });
        }
    }, [section, camera]);

    return null;
};

function Background() {
    const controls = useResource();
    const [listener, setListen] = useState(false);
    const [section, setSection] = useState(0);

    return (
        <ReactScrollWheelHandler
            upHandler={(e) => {
                console.log("scroll up");
            }}
            downHandler={(e) => {
                console.log("scroll down");
                section < 1 && setSection(section + 1);
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
                    position: [90, 0, 81],
                    fov: 25,
                }}
            >
                <CameraShakeWithOrbitScene
                    cfg={{ ...config }}
                    controls={controls}
                />
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
                <AnimationHandler section={section} />
            </Canvas>
        </ReactScrollWheelHandler>
    );
}

export default Background;
