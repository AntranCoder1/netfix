import axios from 'axios';
import React, { useState, useRef } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const emailRef = useRef();
    const displayNameRef = useRef();
    const passwordRer = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setDisplayName(displayNameRef.current.value);
        setPassword(passwordRer.current.value);
        try {
            await axios.post("/auth/register", {
                email, displayName, password
            });
            history.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <button className="loginButton">Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                { !email ? (
                    <div className="input">
                        <input type="email" placeholder="email address" ref={emailRef} />
                        <button 
                            className="registerButton"
                            onClick={handleStart}
                        >
                            Get Started
                        </button>
                    </div>
                ) : (
                    <form className="input">
                        <input type="displayName" placeholder="Username" ref={displayNameRef} />
                        <input type="password" placeholder="Password" ref={passwordRer} />
                        <button className="registerButton" onClick={handleClick}>
                            Start
                        </button>
                    </form>
                ) }
            </div>
        </div>
    )
}

export default Register
