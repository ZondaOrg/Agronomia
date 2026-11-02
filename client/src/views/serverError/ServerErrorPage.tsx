import { token } from "@styled-system/tokens";
import { useNavigate } from "react-router";
import Button from "@/shared/components/button/Button";
import { useAuth } from "@/core/auth/hooks/use-auth";
import { DEFAULT_HOME_ROUTE, ROLE_HOME_ROUTES } from "@/core/routes/role-routes";
import { styles } from "./styles";

const SERVER_ERROR_IMAGE =
    "https://res.cloudinary.com/dvkvlpq07/image/upload/v1793649995/Screenshot_2026-11-02_170618_dglju7.png";

const ServerErrorPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { container, content, title, description, image, actions } = styles();
    const homeRoute = user
        ? (ROLE_HOME_ROUTES[user.role] ?? DEFAULT_HOME_ROUTE)
        : "/login";

    return (
        <main className={container}>
            <section className={content}>
                <h1 className={title}>No pudimos cargar esta página</h1>
                <p className={description}>
                    Hubo un problema de nuestro lado. Probá de nuevo en unos
                    minutos.
                </p>
                <img
                    className={image}
                    src={SERVER_ERROR_IMAGE}
                    alt="Ilustración de un tractor"
                />
                <div className={actions}>
                    <Button
                        color={token("colors.primaryColor")}
                        hoverColor={token("colors.primaryColorHover")}
                        textColor="white"
                        onClick={() => window.location.reload()}
                    >
                        Reintentar
                    </Button>
                    <Button
                        color="white"
                        hoverColor={token("colors.primaryColor") + "20"}
                        borderColor={token("colors.primaryColor")}
                        textColor={token("colors.primaryColor")}
                        onClick={() => navigate(homeRoute)}
                    >
                        Ir al inicio
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default ServerErrorPage;
