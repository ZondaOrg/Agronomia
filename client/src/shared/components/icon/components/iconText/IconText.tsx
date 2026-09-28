import { styles } from "./styles";

interface IconTextProps {
    icon: React.ComponentType<{
        className?: string;
        style?: React.CSSProperties;
    }>;
    value: string;
    fallback?: string;
    textColor?: string;
    iconColor?: string;
}

export function IconText({
    icon: Icon,
    value,
    fallback,
    textColor,
    iconColor,
}: IconTextProps) {
    const slots = styles();

    return (
        <div
            className={slots.iconDetail}
            style={textColor ? { color: textColor } : undefined}
        >
            <Icon
                className={slots.icon}
                style={iconColor ? { color: iconColor } : undefined}
            />
            <span>{value || fallback}</span>
        </div>
    );
}
