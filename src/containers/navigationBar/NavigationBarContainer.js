import './NavigationBarContainer.css';
import Logo from '../../components/navigationBarComponent/logo/Logo';
import Link from '../../components/navigationBarComponent/link/Link';
import Button from '../../components/navigationBarComponent/button/Button';
import LoginSuccess from '../../components/navigationBarComponent/loginSuccess/LoginSuccess';
import { useSelector } from "react-redux"


const NavigationBarContainer = () => {
    const isAuthenticated = useSelector((state) => state.authenticated.isAuthenticated);
    const role = useSelector((state) => state.login.role);

    return (
        <div className="nav-container">
            <div className="logo-link-container">
                <Logo />
                {role === "CUSTOMER" && <Link />}
                {role === "ADMIN" && <></>}
                {!role && <Link />}
            </div>
            <div className="button-container">
                {!isAuthenticated && <Button />}
                {isAuthenticated && <LoginSuccess />}
            </div>
        </div>
    );
}

export default NavigationBarContainer