import React, { useRef, useEffect } from "react";
import { useResource, useThree } from "react-three-fiber";
import { gsap, Power1 } from "gsap";
import CustomEase from "./customEase/CustomEase";

gsap.registerPlugin(CustomEase);

const AnimationHandler = ({ section, setListen, titleRef, descRef }) => {
    const { camera } = useThree();
    const pivot = useResource();
    const deerAni = useRef();

    useEffect(() => {
        pivot.current.add(camera);
        console.log(titleRef.current);
        deerAni.current = gsap
            .timeline({ paused: true })
            .to(titleRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.5,
            })
            .to(
                camera,
                {
                    zoom: 0.8,
                    duration: 3,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.798,0 0.2,1 1,1 "
                    ),
                    onUpdate: function () {
                        camera.updateProjectionMatrix();
                    },
                    onReverseComplete: function () {
                        setListen(false);
                    },
                },
                "-=0.4"
            )
            .to(
                pivot.current.rotation,
                {
                    x: Math.PI * 0.1,
                    y: Math.PI,
                    duration: 2.5,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.798,0 0.2,1 1,1 "
                    ),
                    onComplete: () => {
                        setListen(false);
                    },
                },
                "-=2.9"
            );

        return () => deerAni.current.kill();
    }, [camera, pivot, setListen, titleRef, descRef]);

    useEffect(() => {
        if (section.currentPage === 1 && section.previousPage === 0) {
            deerAni.current.play();
        }

        if (section.currentPage === 0 && section.previousPage === 1) {
            deerAni.current.reverse();
        }
    }, [section]);

    return <object3D ref={pivot} position={[20, 20, 0]} />;
};

export default AnimationHandler;
