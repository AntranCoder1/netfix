import React, { useEffect, useState } from 'react';
import './Login.scss';
import { login } from '../../redux/ApiCall';
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { useHistory, Redirect, Link } from 'react-router-dom';

const Login = ({ responseSuccessGoogle }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch= useDispatch();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { email, password });
    }

    const responseErrorGoogle = (response) => {
        console.log("Google login Failure", response);
    }

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img 
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                </div>
            </div>
            <div className="container">
                <form className="form">
                    <h1>Sign In</h1>
                    <input 
                        type="email"
                        placeholder="Email or phone number"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="loginButton" onClick={handleClick}>Sign In</button>
                    <br />
                    <GoogleLogin
                        clientId="718778022741-nqeapv7qq7no0vs77v5dv2s70jcbcdnf.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <span>
                        New to Netfix? 
                        <Link to="/register" style={{ marginLeft: "4px" }}>
                            <b>Sign up now.</b>
                        </Link>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b>Learn more</b>
                    </small>
                </form>
            </div>
            <div className="footer footer-login">
                <div className="footer-title">Question? Contact us.</div>
                <p className="footer-break"></p>
                <div className="footer-row">
                    <div className="footer-column">
                        <a href="#" className="footer-link">FAQ</a>
                        <a href="#" className="footer-link">Cookie Preferences</a>
                    </div>

                    <div className="footer-column">
                        <a href="#" className="footer-link">Help Center</a>
                        <a href="#" className="footer-link">Corporate Information</a>
                    </div>

                    <div className="footer-column">
                        <a href="#" className="footer-link">Terms of Use</a>
                    </div>

                    <div className="footer-column">
                        <a href="#" className="footer-link">Privacy</a>
                    </div>
                </div>
                <p className="footer-break"></p>
                <p className="footer-text">Netflix Vietnam</p>
            </div>
        </div>
    )
}

export default Login
