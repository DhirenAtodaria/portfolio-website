import React from "react";
import { css } from "@emotion/css";
import Icons from "../Icons";

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
    font-size: 1rem;
    font-weight: 400;

    @media (max-width: 577px) {
        font-size: 0.7rem;
    }

    @media (max-width: 430px) {
        font-size: 0.6rem;
    }
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
                    font-size: 6em;
                    font-family: "Bon";
                    letter-spacing: 3px;
                    overflow: hidden;
                    display: flex;
                    ${chromaticAbberation}
                }

                span:nth-child(2) {
                    margin-right: 6%;
                    font-size: 0.8em;
                    font-family: "LucidaGrande";
                    width: 20ch;
                    text-align: justify;
                    line-height: 10px;
                    opacity: 0.8;
                }
            `}
        >
            <span>
                <Split text={"D. Atodaria"} customRef={titleRef} />
            </span>
            <span ref={(e) => titleRef.current?.push(e)}>
                Software Engineer
            </span>
        </div>
    );
};

const AboutText = ({ aboutRef, sectionRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                align-items: flex-start;
                justify-content: center;

                section {
                    padding-left: 6%;
                    padding-right: 4%;
                    padding-bottom: 5%;
                    padding-top: 2%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    border-left: 2.5px solid white;

                    div {
                        width: unset;
                        overflow: hidden;
                        .header {
                            font-size: 5.5em;
                            font-family: "Bon";
                            letter-spacing: -4px;
                            text-decoration: underline;
                            text-decoration-thickness: 1.1px;
                            line-height: 1em;
                            display: inline-block;
                            ${chromaticAbberation};
                        }

                        .content {
                            font-size: 0.7em;
                            margin-top: 2%;
                            font-family: "LucidaGrande";
                            width: 50ch;
                            text-align: justify;
                            line-height: 1.5em;
                            display: inline-block;
                        }
                    }
                }
            `}
        >
            <section ref={(e) => (sectionRef.current[0] = e)}>
                <div>
                    <span
                        ref={(e) => (aboutRef.current[0] = e)}
                        className="header"
                    >
                        About
                    </span>
                </div>
                <div>
                    <span
                        ref={(e) => (aboutRef.current[1] = e)}
                        className="content"
                    >
                        A self-motivated and curious individual with various
                        difference skills. My journey begins when I left
                        university in 2018 after completing a degree in Maths
                        and Stats. Afterwards I decided to travel to China for a
                        year and gain some personal development. My passion for
                        software development started when I joined a bootcamp
                        early 2020 and I've been a software engineer since. My
                        main expertise lies in frontend development along with
                        React/React Native, however I have experience in all
                        specialities including devops/backend.
                    </span>
                </div>
            </section>
        </div>
    );
};

const WorkItem = ({ company, role, date }) => (
    <div
        className={css`
            margin-bottom: 5%;
        `}
    >
        <div
            className={css`
                display: flex;
                justify-content: space-between;
                font-size: 1.1em;
            `}
        >
            <div>{company}</div>
            <div>{date}</div>
        </div>
        <div
            className={css`
                font-size: 0.9em;
            `}
        >
            {role}
        </div>
    </div>
);

const WorkText = ({ workRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                align-items: flex-start;
                justify-content: center;

                section {
                    padding-left: 6%;
                    padding-right: 4%;
                    padding-bottom: 5%;
                    padding-top: 2%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    border-left: 2.5px solid white;

                    span {
                        margin-left: 5%;
                    }

                    span:nth-child(1) {
                        margin-top: 6%;
                        font-size: 5.5em;
                        font-family: "Bon";
                        letter-spacing: -4px;
                        text-decoration: underline;
                        text-decoration-thickness: 1.1px;
                        ${chromaticAbberation}
                    }

                    span:nth-child(2) {
                        font-size: 0.7em;
                        font-family: "LucidaGrande";
                        width: 60ch;
                        line-height: 17px;
                        display: flex;
                    }
                }
            `}
        >
            <section ref={(e) => (workRef.current[0] = e)}>
                <span ref={(e) => (workRef.current[1] = e)}>Experience</span>
                <span ref={(e) => (workRef.current[2] = e)}>
                    <div
                        className={css`
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                        `}
                    >
                        <WorkItem
                            company={"Babylon Health, London"}
                            date={"Mar. 2021 - Present"}
                            role={"Software Engineer"}
                        />

                        <WorkItem
                            company={"Creditsafe, Cardiff"}
                            date={"Jun. 2020 - Mar 2021"}
                            role={"Junior Software Engineer"}
                        />
                        <WorkItem
                            company={"_nology, London"}
                            date={"Jan. 2020 - Apr. 2020"}
                            role={"Software Developer Bootcamp"}
                        />
                        <WorkItem
                            company={"BT, London"}
                            date={"Sep. 2019 - Oct 2019"}
                            role={"Digital Skills Internship"}
                        />
                        <WorkItem
                            company={"Ameson, Whenzhou China"}
                            date={"Sep. 2018 - Jun 2019"}
                            role={"Educational Ambassador"}
                        />
                    </div>
                </span>
            </section>
        </div>
    );
};

const ContactUsText = ({ contactRef, iconRef }) => {
    return (
        <div
            className={css`
                ${commonStyles}
                align-items: flex-start;
                justify-content: center;

                section {
                    width: 100%;
                    padding-bottom: 5%;
                    padding-top: 2%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                section > div:first-child {
                    width: unset;
                    overflow: hidden;
                    .header {
                        font-size: 5.5em;
                        font-family: "Bon";
                        letter-spacing: -4px;
                        text-decoration: underline;
                        text-decoration-thickness: 1.1px;
                        line-height: 1;
                        display: inline-block;
                        ${chromaticAbberation};
                    }

                    .content {
                        font-size: 0.65em;
                        margin-top: 2%;
                        font-family: "LucidaGrande";
                        width: 50ch;
                        text-align: justify;
                        line-height: 17px;
                        display: inline-block;
                    }
                }
            `}
        >
            <section>
                <div>
                    <span
                        ref={(e) => (contactRef.current[0] = e)}
                        className="header"
                    >
                        Contact
                    </span>
                </div>
                <div
                    className={css`
                        overflow: hidden;
                    `}
                >
                    <div
                        ref={(e) => (iconRef.current[0] = e)}
                        className={css`
                            width: 200px;
                            font-size: 2em;
                            margin-top: 25px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        `}
                    >
                        <Icons />
                    </div>
                </div>
            </section>
        </div>
    );
};

export { OverlayText, AboutText, WorkText, ContactUsText };
