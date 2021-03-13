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
    z-index: 1;
`;

const OverlayText = ({ titleRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                align-items: flex-end;
                flex-direction: column;

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

const AboutText = ({ aboutRef }) => {};

export default OverlayText;
