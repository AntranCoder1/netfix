import React, { useState } from 'react';
import './Login.scss';
import { login } from '../../redux/ApiCall';
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Login = ({ responseSuccessGoogle }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch= useDispatch();
    const { sFetching, error } = useSelector(state => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { email, password });
    }

    const google = () => {
        // window.open("http://localhost:5000/api/auth/google", "_self")
    }

    // const responseSuccessGoogle = (response) => {
    //     console.log(response);
    //     axios({
    //         method: "POST",
    //         url: "/auth/googlelogin",
    //         data: { tokenId: response.tokenId }
    //     }).then(response =>  {
    //         console.log("Google login success", response);
    //     })
    // }

    const responseErrorGoogle = (response) => {
        
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
                    {/* <span className="google" onClick={google}>
                        <img src={Google} alt="" className="icon" />
                        Sign in with google
                    </span> */}
                    <GoogleLogin
                        clientId="718778022741-nqeapv7qq7no0vs77v5dv2s70jcbcdnf.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
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
