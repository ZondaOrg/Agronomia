import { Link, useNavigate } from "react-router";
import type { User } from "@/shared/domain/user/user";
import { InitialsName } from "@/shared/components/initialsName/InitialsName";
import { avatarRole, avatarStyle, avatarText, container, userDetails } from "./style";
import { getFullName } from "./fullname";
import { getRoleDisplayName } from "./role";
import useActive from "@/shared/hooks/use-active";
import { useAuth } from "@/core/auth/hooks/use-auth";
import { VISITANT } from "@/core/routes/visitant/paths";

interface UserDetailsProps {
    user: User;
    to: string;
}

const UserDetails = ({ user, to }: UserDetailsProps) => {
    const fullName = getFullName(user);
    const role = getRoleDisplayName(user.role);
    const {isActive, onActive} = useActive();
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout(user.email);
        navigate(VISITANT.LOGIN);
    }

    return (
        <section onClick={onActive} className={container}>
            {isActive && <Despegable user={user} to={to} logout={handleLogout} />}
            <div className={avatarStyle}>
                <InitialsName
                    fullName={fullName}
                    size="md"
                    nameClassName={avatarText}
                />
                <span className={avatarRole}>[{role}]</span>
            </div>
        </section>
    )
};

interface DespegableProps {
    user: User;
    to: string;
    logout: () => void;
}

const Despegable = ({user, to, logout}: DespegableProps) => {
    return (
        <div className={userDetails}>
            <Link
                to={to}
                aria-label={`Perfil de ${getFullName(user)}, ${getRoleDisplayName(user.role)}`}>
                    {to}
            </Link>
            <p onClick={logout}>cerrar sesión</p>
        </div>
    )
}



export default UserDetails;
