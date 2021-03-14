import React, { useRef } from "react";
import { gsap, Power1 } from "gsap";
import { css } from "@emotion/css";

const commonStyles = css`
    width: 100%;
    height: 100%;
    pointer-events: none;
    color: white;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    align-items: flex-end;
    flex-direction: column;
`;

const OverlayText = ({ titleRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}

                span {
                    margin-right: 8%;
                }

                span:nth-child(1) {
                    margin-top: 10%;
                    font-size: 11.5em;
                    font-family: "Bon";
                    letter-spacing: -4px;
                }

                span:nth-child(2) {
                    font-size: 0.6em;
                    font-family: "Haas";
                    width: 20ch;
                    text-align: justify;
                    line-height: 17px;
                    opacity: 0.8;
                }
            `}
        >
            <span ref={(e) => (titleRef.current[0] = e)}>D. Atodaria</span>
            <span ref={(e) => (titleRef.current[1] = e)}>
                A software engineer living in London. With a focus on front-end
                development and writing clean, quality, code.
            </span>
        </div>
    );
};

const AboutText = ({ aboutRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                align-items: flex-start;

                span {
                    margin-left: 8%;
                }

                span:nth-child(1) {
                    margin-top: 2%;
                    font-size: 7em;
                    font-family: "Bon";
                    letter-spacing: -4px;
                    text-decoration: underline;
                    text-decoration-thickness: 1.1px;
                    text-underline-position: under;
                    opacity: 0;
                }

                span:nth-child(2) {
                    font-size: 0.6em;
                    font-family: "Haas";
                    width: 80ch;
                    text-align: justify;
                    line-height: 17px;
                    opacity: 0;
                }
            `}
        >
            <span ref={(e) => (aboutRef.current[0] = e)}>About</span>
            <span ref={(e) => (aboutRef.current[1] = e)}>
                A self-motivated and curious individual with verious difference
                skills. My journey begins when I left university in 2018 after
                completing a degree in Maths and Stats. Afterwards I decided to
                travel to China for a year and gain some personal development.
                My passion for software development started when I joined a
                bootcamp early 2020 and I've been a software engineer since. My
                main expertise lies in frontend development along with
                React/React Native, however I have experience in all
                specialities including devops/backend.
            </span>
        </div>
    );
};

export { OverlayText, AboutText };
