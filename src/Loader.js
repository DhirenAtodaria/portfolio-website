import React, { useEffect, useRef } from "react";
import { gsap, Power1 } from "gsap";
import { css } from "@emotion/css";
import { motion } from "framer-motion";

export const Loader = ({ outerRef }) => {
    let [loading, setLoading] = React.useState(true);

    const loadingRef = useRef();
    const screenRef = useRef();

    useEffect(() => {
        const loadingAnimation = gsap.timeline();
        loadingAnimation.fromTo(
            loadingRef.current,
            { opacity: 0 },
            { opacity: 0.9, duration: 3, delay: 0.5, ease: Power1.easeOut }
        );
    }, []);

    useEffect(() => {
        if (!loading) {
            const removingAnimation = gsap.timeline();
            removingAnimation.to(screenRef.current, {
                x: "-100%",
                duration: 1,
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
            onClick={() => setLoading(false)}
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
                        font-family: "Bon";
                        letter-spacing: 1em;
                        text-indent: -1em;
                        direction: rtl;
                    `}
                >
                    <svg width="24px" height="24px" viewBox="0 0 24 24">
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
                            color: white;
                            margin-top: 1.5em;
                            font-size: 0.6em;
                        `}
                    >
                        LOADING
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
