import { token } from "@styled-system/tokens";
import { useNavigate } from "react-router";
import Button from "@/shared/components/button/Button";
import { useAuth } from "@/core/auth/hooks/use-auth";
import { DEFAULT_HOME_ROUTE, ROLE_HOME_ROUTES } from "@/core/routes/role-routes";
import { styles } from "./styles";

const NOT_FOUND_IMAGE =
    "https://res.cloudinary.com/dvkvlpq07/image/upload/v1793647070/Screenshot_2026-11-02_161424_ktttay.png";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { container, content, title, description, image, message, actions } =
        styles();
    const homeRoute = user
        ? (ROLE_HOME_ROUTES[user.role] ?? DEFAULT_HOME_ROUTE)
        : DEFAULT_HOME_ROUTE;

    return (
        <section className={container}>
            <div className={content}>
                <h1 className={title}>No hay nada por acá</h1>
                <p className={description}>
                    No encontramos la página que buscás. Volvé al inicio o elegí
                    una sección del menú.
                </p>
                <img
                    className={image}
                    src={NOT_FOUND_IMAGE}
                    alt="Página no encontrada"
                />
                <p className={message}>
                    Si llegaste acá desde un link de AGRO, avisá a Dufal y
                    mandale este número: 404
                </p>
                <div className={actions}>
                    <Button
                        color={token("colors.primaryColor")}
                        hoverColor={token("colors.primaryColorHover")}
                        textColor="white"
                        onClick={() => navigate(homeRoute)}
                    >
                        Ir al inicio
                    </Button>
                    <Button
                        color="white"
                        hoverColor={token("colors.primaryColor") + "20"}
                        borderColor={token("colors.primaryColor")}
                        textColor={token("colors.primaryColor")}
                        onClick={() => navigate(-1)}
                    >
                        Volver a la página anterior
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;