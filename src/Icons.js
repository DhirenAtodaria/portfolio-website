import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/css";

const onClickUrl = (url) => {
    return () => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };
};

const Icons = () => {
    return (
        <>
            <FontAwesomeIcon
                icon={faGithub}
                onClick={onClickUrl("https://github.com/DhirenAtodaria")}
                className={css`
                    cursor: pointer;
                `}
            />
            <FontAwesomeIcon
                icon={faLinkedin}
                onClick={onClickUrl(
                    "https://www.linkedin.com/in/dhiren-atodaria/"
                )}
                className={css`
                    cursor: pointer;
                `}
            />
            <FontAwesomeIcon
                icon={faEnvelope}
                onClick={() =>
                    (window.location = "mailto:dhiren.atodaria@hotmail.co.uk")
                }
                className={css`
                    cursor: pointer;
                `}
            />
        </>
    );
};

export default Icons;
