import React from "react";
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

const chromaticAbberation = css`
    text-shadow: 3px 2px 2px rgba(251, 12, 12, 1),
        0px -1px 3px rgba(12, 79, 251, 0.5), -3px 0px 2px rgba(52, 251, 12, 1);
`;

const Split = ({ text, customRef }) => {
    const textArray = text
        .split("")
        .map((letter) => (letter === " " ? <>&nbsp;</> : letter));

    return textArray.map((letter, index) => (
        <div ref={(e) => (customRef.current[index] = e)}>{letter}</div>
    ));
};

const OverlayText = ({ titleRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                justify-content: center;
                span {
                    margin-right: 8%;
                }

                span:nth-child(1) {
                    font-size: 8.5em;
                    font-family: "Bon";
                    letter-spacing: -4px;
                    overflow: hidden;
                    display: flex;
                    ${chromaticAbberation}
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
            <span>
                <Split text={"D. Atodaria"} customRef={titleRef} />
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
                    margin-top: 6%;
                    font-size: 7em;
                    font-family: "Bon";
                    letter-spacing: -4px;
                    text-decoration: underline;
                    text-decoration-thickness: 1.1px;
                    text-underline-position: under;
                    opacity: 0;
                    ${chromaticAbberation}
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
                A self-motivated and curious individual with various difference
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

const WorkItem = ({ company, role, odd, last }) => (
    <div
        className={css`
            height: 34px;
            ${last ? "margin-bottom: 0px;" : "margin-bottom: 15px;"}
            ${odd ? "margin-right: 10px;" : "margin-left: 10px;"}
        `}
    >
        <div>{company}</div>
        <div>{role}</div>
    </div>
);

const WorkText = ({ workRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                align-items: flex-start;

                span {
                    margin-left: 5%;
                }

                span:nth-child(1) {
                    margin-top: 6%;
                    font-size: 7em;
                    font-family: "Bon";
                    letter-spacing: -4px;
                    text-decoration: underline;
                    text-decoration-thickness: 1.1px;
                    text-underline-position: under;
                    opacity: 0;
                    ${chromaticAbberation}
                }

                span:nth-child(2) {
                    font-size: 0.6em;
                    font-family: "Haas";
                    width: 80ch;
                    line-height: 17px;
                    display: flex;
                    opacity: 0;
                }
            `}
        >
            <span ref={(e) => (workRef.current[0] = e)}>Experience</span>
            <span ref={(e) => (workRef.current[1] = e)}>
                <div
                    className={css`
                        width: 50%;
                        height: 100%;
                        border-right: 0.5px solid white;
                        align-items: flex-end;
                        display: flex;
                        flex-direction: column;
                        text-align: right;
                    `}
                >
                    <WorkItem
                        company={"Babylon Health, London"}
                        role={"Mar. 2021 - Present: Software Engineer"}
                        odd
                    />
                    <WorkItem />
                    <WorkItem
                        company={"_nology, London"}
                        role={
                            "Jan. 2020 - Apr. 2020: Software Developer Bootcamp"
                        }
                        odd
                    />
                    <WorkItem />
                    <WorkItem
                        company={"Ameson, Whenzhou China"}
                        role={"Sep. 2018 - Jun 2019: Educational Ambassador"}
                        odd
                        last
                    />
                </div>
                <div
                    className={css`
                        width: 50%;
                        height: 100%;
                        border-left: 0.5px solid white;
                    `}
                >
                    <WorkItem />
                    <WorkItem
                        company={"Creditsafe, Cardiff"}
                        role={"Jun. 2020 - Mar 2021: Junior Software Engineer"}
                    />
                    <WorkItem />
                    <WorkItem
                        company={"BT, London"}
                        role={"Sep. 2019 - Oct 2019: Digital Skills Internship"}
                    />
                </div>
            </span>
        </div>
    );
};

export { OverlayText, AboutText, WorkText };
