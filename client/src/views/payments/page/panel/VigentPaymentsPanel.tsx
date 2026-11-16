import { RouteTabs } from "@/shared/components/tabs/routeTabs/RouteTabs";
import { tabs } from "./tabs/Tabs";
import { css } from "@styled-system/css";

const tabPanel = css.raw({
    width: "100%",
    minWidth: 0,
    flex: 1,
    minHeight: 0,
    marginTop: "24px",
    padding: "24px",
    boxSizing: "border-box",
    border: "1px solid",
    borderColor: "#E8E8E8",
    borderRadius: "lg",
    bg: "white",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
});


export const VigentPaymentsPanel = () => <RouteTabs tabs={tabs} styles={tabPanel}/>;
