import { pageWrapper, card, header, buttonContainer } from "./styles";
import loginInputs from "./types/inputs";
import loginLinks from "./types/links";
import schema from "./types/schema";
import ErrorToast from "@/shared/components/toast/error/ErrorToast";
import useLogin from "../../hooks/use-login";
import SimpleForm from "@/shared/components/forms/simple-form/SimpleForm";
import Spinner from "@/shared/components/spinner/Spinner";
import ValidationForm from "@/shared/components/forms/validation-form/ValidationForm";
import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";
import Footer from "@/shared/components/forms/simple-form/components/footer/Footer";

const Login = () => {
    const { isError, login, refresh, loading } = useLogin();

    const {container, title, subtitle} = header();

    return (
        <section className={pageWrapper}>
            <div className={card}>
                <header className={container}>
                    <h1 className={title}>Bienvenido</h1>
                    <p className={subtitle}>Usá el correo y la contraseña de tu cuenta de trabajo.</p>
                </header>
                <ValidationForm 
                    subForms={[ { inputs: loginInputs, id: 1 } ]} 
                    schema={schema} 
                    onSubmit={login} 
                />
                <div className={buttonContainer}>
                    <Button
                        type="submit"
                        fullWidth
                        color={token("colors.primaryColor")}
                        hoverColor={token("colors.primaryColorHover")}
                        form="validation-form"
                    >
                    Iniciar Sesión
                </Button>   
                </div>
                <Footer links={loginLinks} />
            </div>
        </section>
    )

    /*return (
        <section className={pageWrapper}>
            <div className={card}>
                {loading ? (
                    <Spinner
                        size="lg"
                        centered
                    />
                ) : (
                    <SimpleForm
                        title="Bienvenido"
                        isLoading={loading}
                        inputs={loginInputs}
                        buttonData={{ text: "Iniciar sesión" }}
                        schema={schema}
                        onSubmit={login}
                        links={loginLinks}
                    />
                )}
            </div>
            {isError && (
                <ErrorToast
                    message={
                        "Correo o contraseña incorrectos. Verifique sus datos e intente nuevamente"
                    }
                    onClose={refresh}
                />
            )}
        </section>
    );*/
};

export default Login;
