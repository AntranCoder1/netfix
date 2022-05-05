import React, { useEffect, useState } from 'react';
import './Login.scss';
import { login } from '../../redux/ApiCall';
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { useHistory, Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Trans, useTranslation } from 'react-i18next';
import LanguageIcon from '@material-ui/icons/Language';

const Login = ({ responseSuccessGoogle }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch= useDispatch();
    const history = useHistory();
    const [error, setError] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const isInvalid = password === '' || email === '';

    const handleClick = (e) => {
        e.preventDefault();
        try {
            login(dispatch, { email, password });
            history.push("/profile");
        } catch (error) {
            setEmail("");
            setPassword("");
            setError(error.message);
        }
    }

    const responseErrorGoogle = (response) => {
        console.log("Google login Failure", response);
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <Link to="/register">
                        <img 
                            className="logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                            alt=""
                        />
                    </Link>
                </div>
            </div>

            <div className="container">
                <h1>
                    <Trans t={t}>login-title</Trans>
                </h1>
                { error && <div className="error">Email or password incorrect</div> }
                <form className="baseForm" onSubmit={handleClick}>
                    <input 
                        type="email"
                        placeholder={t("login-email")}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type={passwordShown ? "text" : "password"}
                        placeholder={t("login-password")}
                        onChange={(e) => setPassword(e.target.value)}
                       
                    />
                    { passwordShown 
                        ? <VisibilityIcon className="icon" onClick={togglePasswordVisiblity} /> 
                        : <VisibilityOffIcon className="icon" onClick={togglePasswordVisiblity} />
                    }
                    <button className="btnSubmit" disabled={isInvalid} type="submit" data-testid="sign-in">
                        <Trans t={t}>login-btn</Trans>
                    </button>
                </form>

                <br />
                <GoogleLogin
                    clientId="718778022741-nqeapv7qq7no0vs77v5dv2s70jcbcdnf.apps.googleusercontent.com"
                    buttonText={t("login-btn-google")}
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <p className="text">
                    <Trans t={t}>login-text</Trans> 
                    <Link to="/register">
                        <Trans t={t}>login-text-login</Trans>
                    </Link>.
                </p>
                <p className="textSmall">
                    <Trans t={t}>login-text-small</Trans>
                    <a href="#" style={{color: "#0071eb", marginLeft: "4px"}}>
                        <Trans t={t}>login-text-a</Trans>
                    </a>
                </p>
            </div>
            <div className="footer-login">
                <div className="footer-login-title">
                    <Trans t={t}>login-footer-title</Trans>
                </div>
                <p className="footer-login-break"></p>
                <div className="footer-login-row">
                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">
                            <Trans t={t}>login-footer-column1-link-1</Trans>
                        </a>
                        <a href="#" className="footer-login-link">
                            <Trans t={t}>login-footer-column1-link-2</Trans>
                        </a>
                    </div>

                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">
                            <Trans t={t}>login-footer-column2-link-1</Trans>
                        </a>
                        <a href="#" className="footer-login-link">
                            <Trans t={t}>login-footer-column2-link-2</Trans>
                        </a>
                    </div>

                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">
                            <Trans t={t}>login-footer-column3-link-1</Trans>
                        </a>
                    </div>

                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">
                            <Trans t={t}>login-footer-column4-link-1</Trans>
                        </a>
                    </div>
                </div>
                <div className="trans">
                    <LanguageIcon className="trans-icon" />
                    <select onClick={changeLanguage}>
                        <option value="en">English</option>
                        <option value="vn">Tiếng Việt</option>
                    </select>
                </div>
                <p className="footer-login-break"></p>
            </div>
        </div>
    )
}

export default Login
