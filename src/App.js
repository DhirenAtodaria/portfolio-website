import React from "react";
import Background from "./background";
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
                `}
            >
                This be nav
            </nav>
            <div
                className={css`
                    height: 85%;
                    width: 90%;
                `}
            >
                <Background />
            </div>
        </div>
    );
}

export default App;
