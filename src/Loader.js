import React, { useEffect, useRef } from "react";
import { gsap, Power1, Expo } from "gsap";
import { css } from "@emotion/css";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";

export const Loader = ({ loading, setLoading }) => {
    const loadingRef = useRef();
    const spinnerRef = useRef();
    const loadingFinishedRef = useRef([]);
    const screenRef = useRef();
    const allowAnimation = useRef(false);

    const { progress } = useProgress();

    useEffect(() => {
        const loadingAnimation = gsap.timeline();
        loadingAnimation.fromTo(
            loadingRef.current,
            { opacity: 0 },
            { opacity: 0.9, duration: 3, delay: 0.5, ease: Power1.easeOut }
        );
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const loadingFinishedAnimation = gsap.timeline();
            loadingFinishedAnimation
                .to(spinnerRef.current, {
                    opacity: 0,
                    duration: 1,
                    delay: 2,
                    ease: Power1.easeOut,
                    stagger: { each: 0.5 },
                })
                .to(
                    loadingFinishedRef.current,
                    {
                        y: "0%",
                        duration: 0.75,
                        ease: Power1.easeOut,
                        stagger: { each: 0.5 },
                        onComplete: () => {
                            allowAnimation.current = true;
                        },
                    },
                    "-=0.25"
                );
        }
    }, [progress]);

    useEffect(() => {
        if (!loading) {
            const removingAnimation = gsap.timeline();
            removingAnimation.to(screenRef.current, {
                x: "-100%",
                duration: 1,
                ease: Expo.easeInOut,
            });
        }
    }, [loading]);

    return (
        <div
            className={css`
                position: absolute;
                display: flex;
                z-index: 5;
                height: 100%;
                width: 100%;

                flex-direction: column;
                justify-content: flex-end;
                background-color: black;
            `}
            ref={screenRef}
            onClick={() => {
                if (allowAnimation.current) {
                    setLoading(false);
                }
            }}
        >
            <div
                ref={loadingRef}
                className={css`
                    justify-content: center;
                    align-items: flex-end;
                `}
            >
                <div
                    className={css`
                        margin-bottom: 10em;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-family: "LucidaGrande";
                        letter-spacing: 0.5em;
                        text-indent: -1em;
                        direction: rtl;
                    `}
                >
                    <svg
                        ref={spinnerRef}
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                    >
                        <motion.path
                            d="M 2, 12 a 10, 10 0 1,0 20,0 a 10, 10 0 1,0 -20,0"
                            strokeWidth={1}
                            stroke="#ffffff"
                            initial={{
                                pathLength: 0,
                                rotate: 360,
                            }}
                            animate={{
                                pathLength: 1,
                                rotate: -720,
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    </svg>
                    <div
                        className={css`
                            overflow: hidden;
                            height: 14px;
                            width: 100%;
                            margin-top: 1.5em;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        `}
                    >
                        <div
                            ref={(e) => (loadingFinishedRef.current[1] = e)}
                            className={css`
                                color: white;
                                font-size: 12px;
                                margin-right: 0.5em;
                                transform: translate(0px, -100%);
                                cursor: pointer;
                            `}
                        >
                            ENTER
                        </div>
                        <div
                            ref={(e) => (loadingFinishedRef.current[0] = e)}
                            className={css`
                                color: white;
                                font-size: 12px;
                                margin-right: 0.5em;
                                transform: translate(0px, -100%);
                            `}
                        >
                            LOADING
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
