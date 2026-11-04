import { header } from "./styles";

const Header = () => {

    const { container, title, subtitle } = header();

    return (
        <header className={container}>
            <h1 className={title}>Bienvenido</h1>
            <p className={subtitle}>Usá el correo y la contraseña de tu cuenta de trabajo.</p>
        </header>
    )
}

export default Header;