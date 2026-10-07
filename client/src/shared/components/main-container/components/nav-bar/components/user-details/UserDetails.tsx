import { Link } from "react-router";
import type { User } from "@/shared/domain/user/user";
import { InitialsName } from "@/shared/components/initialsName/InitialsName";
import { avatarRole, avatarStyle, avatarText, container, userDetails } from "./style";
import { getFullName } from "./fullname";
import { getRoleDisplayName } from "./role";
import useActive from "@/shared/hooks/use-active";

interface UserDetailsProps {
    user: User;
    to: string;
}

const UserDetails = ({ user, to }: UserDetailsProps) => {
    const fullName = getFullName(user);
    const role = getRoleDisplayName(user.role);
    const {isActive, onActive} = useActive();

    return (
        <section onClick={onActive} className={container}>
            {isActive && <Despegable user={user} to={to} />}
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


const Despegable = ({user, to}: UserDetailsProps) => {
    return (
        <div className={userDetails}>
            <Link
                to={to}
                aria-label={`Perfil de ${getFullName(user)}, ${getRoleDisplayName(user.role)}`}>
                    {to}
            </Link>
            <p>cerrar sesión</p>
        </div>
    )
}



export default UserDetails;
