import {
    body,
    description as descriptionStyle,
    header,
    panel,
    title,
    titleGroup,
} from "./styles";

type TitleSize = "sm" | "md" | "xl";
type PanelMaxWidth = "sm" | "md" | "lg" | "xl" | "full";
type BodyMaxHeight = "sm" | "md" | "lg" | "xl" | "none";

const SectionPanel = ({
    title: titleText,
    children,
    centered = false,
    actions,
    description,
    titleSize = "md",
    maxWidth = "lg",
    maxHeight = "none",
}: {
    title: string;
    centered?: boolean;
    children: React.ReactNode;
    actions?: React.ReactNode;
    description?: string;
    titleSize?: TitleSize;
    maxWidth?: PanelMaxWidth;
    maxHeight?: BodyMaxHeight;
}) => (
    <section className={panel({ maxWidth })}>
        <div className={header}>
            <div className={titleGroup}>
                <h2 className={title({ size: titleSize })}>{titleText}</h2>
                {actions}
            </div>
            {description && <p className={descriptionStyle}>{description}</p>}
        </div>
        <div className={body({ centered, maxHeight })}>{children}</div>
    </section>
);

export default SectionPanel;
