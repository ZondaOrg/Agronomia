import { useState } from "react";
import type { Tab } from "./types/Tabs";
import { activeTab, tab, tabPanel, tabsContainer, tabsList } from "./styles";

export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeTabData = tabs[activeIndex];

    if (!activeTabData) {
        return null;
    }

    return (
        <section className={tabsContainer}>
            <div
                className={tabsList}
                role="tablist"
                aria-label="Secciones"
            >
                {tabs.map((tabData, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <button
                            key={tabData.nameTab}
                            id={`tab-${index}`}
                            className={`${tab} ${isActive ? activeTab : ""}`}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${index}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveIndex(index)}
                        >
                            {tabData.nameTab}
                        </button>
                    );
                })}
            </div>
            <div
                id={`tabpanel-${activeIndex}`}
                className={tabPanel}
                role="tabpanel"
                aria-labelledby={`tab-${activeIndex}`}
            >
                {activeTabData.page}
            </div>
        </section>
    );
};
