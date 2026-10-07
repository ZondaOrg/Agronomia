import { Link } from "react-router";
import type { User } from "@/shared/domain/user/user";
import { InitialsName } from "@/shared/components/initialsName/InitialsName";
import { avatarRole, avatarStyle, avatarText } from "./style";
import { getFullName } from "./fullname";
import { getRoleDisplayName } from "./role";

interface UserDetailsProps {
    user: User;
    to: string;
}

const UserDetails = ({ user, to }: UserDetailsProps) => {
    const fullName = getFullName(user);
    const role = getRoleDisplayName(user.role);

    return (
        <Link
            to={to}
            aria-label={`Perfil de ${fullName}, ${role}`}
            title={fullName}
            className={avatarStyle}
        >
            <InitialsName
                fullName={fullName}
                size="md"
                nameClassName={avatarText}
            />
            <span className={avatarRole}>[{role}]</span>
        </Link>
    );
};

export default UserDetails;
