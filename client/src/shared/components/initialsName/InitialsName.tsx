// InitialsName.tsx
import { avatarInitials } from "./style";

type AvatarSize = "sm" | "md" | "lg";

interface InitialsNameProps {
    fullName: string;
    size?: AvatarSize;
    nameClassName?: string;
}

export const InitialsName = ({
    fullName,
    size = "md",
    nameClassName,
}: InitialsNameProps) => {
    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");

    return (
        <>
            <span className={avatarInitials({ size })}>{initials}</span>
            <span className={nameClassName}>{fullName}</span>
        </>
    );
};
