import React from "react";
import { Background, OverlayText } from "./background";
import { css } from "@emotion/css";

function App() {
    return (
        <div
            className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;
                width: 100%;
                position: relative;
            `}
        >
            <nav
                className={css`
                    width: 90%;
                    height: 7.5%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                `}
            >
                <svg height="20" width="45">
                    <polygon
                        points="0,0 20,0 20,20 0,20"
                        className={css`
                            fill: black;
                            clip-path: polygon(0 0, 100% 50%, 0 100%);
                            stroke: white;
                            stroke-width: 1;
                        `}
                    />

                    <polygon
                        points="25,0 45,0 45,20 25,20"
                        className={css`
                            fill: black;
                            clip-path: polygon(0 100%, 50% 0%, 100% 100%);
                            stroke: white;
                            stroke-width: 1;
                        `}
                    />
                </svg>
                <div
                    className={css`
                        transform: translateX(-50%);
                        position: absolute;
                        left: 50%;
                        font-size: 0.9em;
                        font-family: "BonRegular";
                        font-weight: 700;
                    `}
                >
                    1/4
                </div>
                <ul
                    className={css`
                        list-style-type: none;
                        font-size: 0.75em;
                        display: flex;
                        font-weight: 700;
                        li {
                            letter-spacing: 0.1em;
                            margin-left: 40px;
                            font-family: "BonRegular";
                        }
                    `}
                >
                    <li>Home</li>
                    <li>About</li>
                    <li>Work</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <div
                className={css`
                    height: 85%;
                    width: 90%;
                    position: relative;
                `}
            >
                <OverlayText />
                <Background />
            </div>
        </div>
    );
}

export default App;
