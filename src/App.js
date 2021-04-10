import React, { useRef, useState } from "react";
import { Background, OverlayText, AboutText, WorkText } from "./background";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

const commonStyles = css`
    width: 90%;
    height: 7.5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const baseTextStyles = css`
    font-family: "BonRegular";
    font-weight: 700;
    letter-spacing: 0.1em;
`;

const Nav = ({ currentPage }) => {
    return (
        <nav
            className={css`
                ${commonStyles}
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
                    ${baseTextStyles}
                    transform: translateX(-50%);
                    position: absolute;
                    left: 50%;
                    font-size: 0.85em;
                `}
            >
                {currentPage + 1}/4
            </div>
            <ul
                className={css`
                    ${baseTextStyles}
                    list-style-type: none;
                    font-size: 0.75em;
                    display: flex;
                    li {
                        margin-left: 40px;
                    }
                `}
            >
                <li>Home</li>
                <li>About</li>
                <li>Work</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
};

const Footer = () => {
    return (
        <div
            className={css`
                ${commonStyles}
                ${baseTextStyles}
                justify-content: center;
                font-size: 0.8em;
            `}
        >
            <div
                className={css`
                    ${commonStyles}
                    width: 125px;
                    ${baseTextStyles}
                    font-size: 1.6em;
                `}
            >
                <FontAwesomeIcon icon={faGithub} />
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faEnvelope} />
            </div>
        </div>
    );
};

const App = () => {
    const titleRef = useRef([]);
    const aboutRef = useRef([]);
    const workRef = useRef([]);
    const [section, setSection] = useState({
        currentPage: 0,
        previousPage: null,
    });
    const [loading, setLoading] = React.useState(true);

    const refs = { titleRef, aboutRef, workRef };

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
            <Loader loading={loading} setLoading={setLoading} />
            <Nav currentPage={section.currentPage} />
            <div
                className={css`
                    height: 85%;
                    width: 90%;
                    position: relative;
                `}
            >
                <OverlayText {...refs} />
                <Background
                    {...refs}
                    section={section}
                    setSection={setSection}
                    loading={loading}
                />
                <AboutText {...refs} />
                <WorkText {...refs} />
            </div>
            <Footer />
        </div>
    );
};

export default App;
