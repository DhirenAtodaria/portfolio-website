import React, { useRef, useEffect } from "react";
import { useFrame, useResource, useThree } from "react-three-fiber";
import { gsap } from "gsap";
import CustomEase from "./customEase/CustomEase";

gsap.registerPlugin(CustomEase);

const AnimationHandler = ({
    section,
    setListen,
    setAnimating,
    titleRef,
    aboutRef,
    mouse,
}) => {
    const { camera } = useThree();
    const pivot = useResource();
    const deerAni = useRef();
    const deerAni2 = useRef();

    // useFrame(() => {
    //     pivot.current.rotation.y = mouse.current[0];
    // });

    useEffect(() => {
        pivot.current.add(camera);
        deerAni.current = gsap
            .timeline({ paused: true })
            .to(titleRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.5,
            })
            .to(
                pivot.current.rotation,
                {
                    x: Math.PI * 0.1,
                    y: Math.PI,
                    duration: 2,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.798,0 0.2,1 1,1 "
                    ),
                },
                "-=0.4"
            )
            .to(
                camera.position,
                {
                    x: -30,
                    y: -30,
                    duration: 1.5,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.798,0 0.2,1 1,1 "
                    ),
                },
                "-=2.0"
            )
            .fromTo(
                aboutRef.current,
                {
                    opacity: 0,
                    y: -10,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    onComplete: () => {
                        setListen(false);
                        setAnimating(false);
                    },
                    onReverseComplete: function () {
                        setListen(false);
                        setAnimating(false);
                    },
                },
                "-=0.5"
            );

        return () => deerAni.current.kill();
    }, [camera, pivot, setListen, titleRef, aboutRef, setAnimating]);

    useEffect(() => {
        deerAni2.current = gsap
            .timeline({ paused: true })
            .to(aboutRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.5,
            })
            .to(
                pivot.current.rotation,
                {
                    x: Math.PI * 0.2,
                    y: Math.PI * 1.6,
                    duration: 2,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.798,0 0.2,1 1,1 "
                    ),
                    onComplete: () => {
                        setListen(false);
                        setAnimating(false);
                    },
                    onReverseComplete: function () {
                        setListen(false);
                        setAnimating(false);
                    },
                },
                "-=0.4"
            )
            .to(
                pivot.current.position,
                {
                    z: -10,
                    x: -10,
                    duration: 2.1,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.798,0 0.2,1 1,1 "
                    ),
                },
                "-=1.9"
            );
    }, [aboutRef, camera, pivot, setAnimating, setListen]);

    useEffect(() => {
        if (section.currentPage === 1 && section.previousPage === 0) {
            deerAni.current.play();
        }

        if (section.currentPage === 0 && section.previousPage === 1) {
            deerAni.current.reverse();
        }

        if (section.currentPage === 2 && section.previousPage === 1) {
            deerAni2.current.play();
        }

        if (section.currentPage === 1 && section.previousPage === 2) {
            deerAni2.current.reverse();
        }
    }, [section]);

    return <object3D ref={pivot} position={[20, 20, 0]} />;
};

export default AnimationHandler;
