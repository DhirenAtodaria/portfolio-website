import React, { useRef, useState, useEffect } from "react";
import { Background, OverlayText, AboutText, WorkText } from "./background";
import { css } from "@emotion/css";
import Icons from "./Icons";
import Loader from "./Loader";
import { ContactUsText } from "./background/OverlayText";
import isMobile from "is-mobile";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-169339982-1";
ReactGA.initialize(TRACKING_ID);

const documentHeight = () => {
    const doc = document.documentElement;
    if (isMobile({ tablet: true })) {
        doc.style.setProperty("height", `${window.innerHeight}px`);
    } else {
        doc.style.setProperty("height", `100vh`);
    }
};
documentHeight();

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
                    font-size: 0.8em;
                `}
            >
                {currentPage + 1}/4
            </div>
        </nav>
    );
};

const Footer = ({ footerIconRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                ${baseTextStyles}
                justify-content: center;
                font-size: 0.9em;
                overflow: hidden;
            `}
        >
            <div
                ref={(e) => (footerIconRef.current[0] = e)}
                className={css`
                    ${commonStyles}
                    width: 125px;
                    ${baseTextStyles}
                    font-size: 1.6em;
                `}
            >
                <Icons />
            </div>
        </div>
    );
};

const App = () => {
    const titleRef = useRef([]);
    const aboutRef = useRef([]);
    const sectionRef = useRef([]);
    const workRef = useRef([]);
    const contactRef = useRef([]);
    const iconRef = useRef([]);
    const footerIconRef = useRef([]);
    const [section, setSection] = useState({
        currentPage: 0,
        previousPage: null,
    });
    const [loading, setLoading] = React.useState(true);

    const refs = {
        titleRef,
        aboutRef,
        sectionRef,
        workRef,
        contactRef,
        iconRef,
        footerIconRef,
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

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
                    width: 100%;
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
                <ContactUsText {...refs} />
            </div>
            <Footer {...refs} />
        </div>
    );
};

export default App;
