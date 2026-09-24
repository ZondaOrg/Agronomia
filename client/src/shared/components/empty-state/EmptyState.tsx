import type { ReactNode } from "react";
import { styles } from "./style";

type EmptyStateProps = {
    icon: ReactNode;
    title: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
};

export const EmptyState = ({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) => {
    const {
        container,
        iconWrapper,
        title: titleStyle,
        description: descriptionStyle,
    } = styles();

    return (
        <div className={container}>
            <div className={iconWrapper}>{icon}</div>
            <p className={titleStyle}>{title}</p>
            <p className={descriptionStyle}>{description}</p>
            {action}
        </div>
    );
};
