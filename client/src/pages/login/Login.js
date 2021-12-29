import React, { useState } from 'react';
import './Login.scss';
import Google from '../../img/google.png';
import { login } from '../../redux/ApiCall';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch= useDispatch();
    const { sFetching, error } = useSelector(state => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { email, password });
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
                    <span className="google">
                        <img src={Google} alt="" className="icon" />
                        Sign in with google
                    </span>
                    <span>
                        New to Netfix? <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b>Learn more</b>
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login
