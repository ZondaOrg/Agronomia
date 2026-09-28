import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { tab, tabPanel, tabsContainer, tabsList } from "../styles";
import type { RouteTab } from "../types/Tabs";
import { NavLink, Outlet } from "react-router";

export const RouteTabs = ({ tabs }: { tabs: RouteTab[] }) => (
    <section className={tabsContainer}>
        <div
            className={tabsList}
            role="tablist"
            aria-label="Secciones"
        >
            {tabs.map((t) => (
                <RoleGuard
                    key={t.nameTab}
                    allowedRoles={t.allowedRoles || []}
                >
                    <NavLink
                        to={t.to}
                        end={t.end}
                        role="tab"
                        className={({ isActive }) => tab({ active: isActive })}
                    >
                        {t.nameTab}
                    </NavLink>
                </RoleGuard>
            ))}
        </div>
        <div
            className={tabPanel}
            role="tabpanel"
        >
            <Outlet />
        </div>
    </section>
);
