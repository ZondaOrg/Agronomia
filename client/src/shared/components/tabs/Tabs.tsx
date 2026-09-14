import { useState } from "react";
import type { Tab } from "./types/Tabs";
import { tab, tabPanel, tabsContainer, tabsList } from "./styles";
import { RoleGuard } from "@/core/auth/components/RoleGuard";

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
                        <RoleGuard allowedRoles={tabData.allowedRoles || []}>
                            <button
                                key={tabData.nameTab}
                                className={tab({ active: isActive })}
                                type="button"
                                role="tab"
                                tabIndex={isActive ? 0 : -1}
                                onClick={() => setActiveIndex(index)}
                            >
                                {tabData.nameTab}
                            </button>
                        </RoleGuard>
                    );
                })}
            </div>
            <div
                className={tabPanel}
                role="tabpanel"
                aria-labelledby={`tab-${activeIndex}`}
            >
                {activeTabData.page}
            </div>
        </section>
    );
};
