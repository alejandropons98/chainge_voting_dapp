import { Header } from "../Header/Header";

const Layout = ({ children }) => {
    return (
        <div className="layout">
        <Header />
        <div className="layout__content">{children}</div>
        </div>
    );
    }

export { Layout };