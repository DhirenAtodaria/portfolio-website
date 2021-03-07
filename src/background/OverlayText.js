import React from "react";
import { css } from "@emotion/css";

const OverlayText = () => {
    return (
        <div
            className={css`
                width: 100%;
                height: 100%;
                pointer-events: none;
                color: white;
                display: flex;
                align-items: flex-end;
                position: absolute;
                z-index: 1;
                flex-direction: column;
                opacity: 0.8;

                span {
                    margin-right: 8%;
                }

                span:nth-child(1) {
                    margin-top: 10%;
                    font-size: 9em;
                    font-family: "Bon";
                    letter-spacing: -4px;
                }

                span:nth-child(2) {
                    font-size: 0.7em;
                    font-family: "Haas";
                    width: 20ch;
                    text-align: right;
                    line-height: 17px;
                }
            `}
        >
            <span>D. Atodaria</span>
            <span>
                A software engineer living in London. With a focus on front-end
                development.
            </span>
        </div>
    );
};

export default OverlayText;
