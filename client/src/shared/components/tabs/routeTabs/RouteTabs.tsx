import { RoleGuard } from "@/core/auth/components/RoleGuard";
import { tab, tabsContainer, tabsList } from "../styles";
import type { RouteTabProps } from "../types/Tabs";
import { NavLink, Outlet } from "react-router";
import { css } from "@styled-system/css";

export const RouteTabs = ({ tabs, styles }: RouteTabProps) => (
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
            className={css(styles)}
            role="tabpanel"
        >
            <Outlet />
        </div>
    </section>
);
