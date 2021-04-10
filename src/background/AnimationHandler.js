import React, { useRef, useEffect } from "react";
import { useResource, useThree } from "react-three-fiber";
import { gsap, Power3 } from "gsap";
import CustomEase from "./customEase/CustomEase";

gsap.registerPlugin(CustomEase);

const AnimationHandler = ({
    section,
    setListen,
    setAnimating,
    titleRef,
    aboutRef,
    workRef,
    loading = true,
}) => {
    const { camera } = useThree();
    const pivot = useResource();
    const deerAni = useRef();
    const deerAni2 = useRef();
    const deerAni3 = useRef();
    const initialLoadingAni = useRef();

    useEffect(() => {
        pivot.current.add(camera);

        initialLoadingAni.current = gsap
            .timeline({ paused: true, delay: 1 })
            .fromTo(
                pivot.current.rotation,
                {
                    x: (-Math.PI / 4) * 0.8,
                },
                {
                    x: 0,
                    duration: 3.5,
                    ease: Power3.easeInOut,
                }
            )
            .to(
                pivot.current.position,
                {
                    x: 20,
                    y: 20,
                    z: 0,
                    duration: 3.5,
                    ease: Power3.easeInOut,
                },
                "-=3.5"
            )
            .fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: "-100%",
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: { each: 0.04, from: "random" },
                },
                "-=2"
            );

        return () => initialLoadingAni.current.kill();
    }, [camera, pivot, setAnimating, setListen, titleRef]);

    useEffect(() => {
        deerAni.current = gsap
            .timeline({ paused: true })
            .to(titleRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.5,
                onReverseComplete: function () {
                    setListen(false);
                    setAnimating(false);
                },
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
                onReverseComplete: function () {
                    setListen(false);
                    setAnimating(false);
                },
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
            )
            .fromTo(
                workRef.current,
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
                },
                "-=0.5"
            );

        return () => deerAni2.current.kill();
    }, [aboutRef, camera, pivot, setAnimating, setListen, workRef]);

    useEffect(() => {
        deerAni3.current = gsap
            .timeline({ paused: true })
            .to(workRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.5,
                onReverseComplete: function () {
                    setListen(false);
                    setAnimating(false);
                },
            })
            .to(
                pivot.current.position,
                {
                    y: 1000,
                    x: -20,
                    duration: 3.5,
                    ease: Power3.easeInOut,
                },
                "-=0.4"
            );

        return () => deerAni3.current.kill();
    }, [pivot, setAnimating, setListen, workRef]);

    useEffect(() => {
        if (!loading) {
            initialLoadingAni.current.play();
        }

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

        if (section.currentPage === 3 && section.previousPage === 2) {
            console.log("running");
            deerAni3.current.play();
        }

        if (section.currentPage === 2 && section.previousPage === 3) {
            deerAni3.current.reverse();
        }
    }, [loading, section]);

    return <object3D ref={pivot} position={[89.5, -40, -85]} />;
};

export default AnimationHandler;
