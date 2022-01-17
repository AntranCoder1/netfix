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
    const [error, setError] = useState("");

    const isInvalid = password === '' || email === '';

    const handleClick = (e) => {
        e.preventDefault();
        try {
            login(dispatch, { email, password });
            // history.push("/profile");
        } catch (error) {
            setEmail("");
            setPassword("");
            setError(error.message);
        }
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
                <h1>Sign In</h1>
                { error && <div className="error">Email or password incorrect</div> }
                <form className="baseForm" onSubmit={handleClick}>
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
                    <button className="btnSubmit" disabled={isInvalid} type="submit" data-testid="sign-in">
                        Sign In
                    </button>
                </form>

                <br />
                <GoogleLogin
                    clientId="718778022741-nqeapv7qq7no0vs77v5dv2s70jcbcdnf.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <p className="text">
                    New to Netflix? <Link to="/register">Sign up now</Link>.
                </p>
                <p className="textSmall">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. 
                    <a href="#" style={{color: "#0071eb", marginLeft: "4px"}}>Learn more.</a>
                </p>
            </div>
            <div className="footer-login">
                <div className="footer-login-title">Question? Contact us.</div>
                <p className="footer-login-break"></p>
                <div className="footer-login-row">
                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">FAQ</a>
                        <a href="#" className="footer-login-link">Cookie Preferences</a>
                    </div>

                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">Help Center</a>
                        <a href="#" className="footer-login-link">Corporate Information</a>
                    </div>

                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">Terms of Use</a>
                    </div>

                    <div className="footer-login-column">
                        <a href="#" className="footer-login-link">Privacy</a>
                    </div>
                </div>
                <p className="footer-login-break"></p>
            </div>
        </div>
    )
}

export default Login
