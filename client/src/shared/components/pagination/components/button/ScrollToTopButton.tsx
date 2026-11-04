import { useState, useEffect } from "react";
import { token } from "@styled-system/tokens";
import { css } from "@styled-system/css";

export const ScrollToTopButton = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!showScrollTop) return null;

    return (
        <button
            onClick={scrollToTop}
            title="Volver arriba"
            className={css({
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                width: "3rem",
                height: "3rem",
                backgroundColor: token("colors.primaryColor"),
                border: "none",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                transition:
                    "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out",
                _hover: {
                    backgroundColor: token("colors.primaryColorHover"),
                },
            })}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m18 15-6-6-6 6" />
            </svg>
        </button>
    );
};
