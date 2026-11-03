import loginInputs from "../types/inputs";
import loginLinks from "../types/links";
import schema from "../types/schema";
import useLogin from "../hooks/use-login";
import ValidationForm from "@/shared/components/forms/validation-form/ValidationForm";
import Footer from "@/shared/components/forms/simple-form/components/footer/Footer";
import Header from "../components/header/Header";
import { card, pageWrapper } from "./styles";
import ButtonContainer from "../components/button-container/ButtonContainer";
import ErrorMessage from "../components/error-message/ErrorMessage";

const Login = () => {
    const { isError, login, refresh } = useLogin();

    return (
        <section className={pageWrapper}>
            <div className={card}>
                <Header />
                <ValidationForm 
                    subForms={[ { inputs: loginInputs, id: 1 } ]} 
                    schema={schema} 
                    onSubmit={login} 
                />
                <ButtonContainer />
                <Footer links={loginLinks} />
            </div>
            {isError && <ErrorMessage refresh={refresh} />}
        </section>
    )
};

export default Login;
