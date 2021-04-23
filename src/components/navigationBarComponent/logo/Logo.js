import './Logo.css';
import { useSelector } from 'react-redux';




const Logo = () => {

    const role = useSelector((state) => state.login.role);

    return (
        <>
            {role === "CUSTOMER" &&
                <a href="/" className="logo-a-link">
                    <img className="logo-component" src="logo.png" alt="" />
                </a>
            }

            {role === "ADMIN" &&
                <a href="/admin" className="logo-a-link">
                    <img className="logo-component" src="logo.png" alt="" />
                </a>
            }

            {!role &&
                <a href="/" className="logo-a-link">
                    <img className="logo-component" src="logo.png" alt="" />
                </a>
            }

        </>
    );
};

export default Logo;