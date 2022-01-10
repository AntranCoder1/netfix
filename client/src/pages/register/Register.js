import axios from 'axios';
import React, { useState, useRef } from 'react';
import './Register.scss';
import { useHistory, Link } from 'react-router-dom';
import { validEmail, validPassword } from '../../regex';

const Register = () => {

    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const history = useHistory();

    const emailRef = useRef();
    const displayNameRef = useRef();
    const passwordRer = useRef();

    // const validate = () => {
    //     if (!validEmail.test(emailRef)) {
    //         setEmailErr(true);
    //     }
    //     if (!validPassword.test(passwordRer)) {
    //         setPwdError(true);
    //     }
    // }

    const handleStart = () => {
        if (!validEmail.test(emailRef)) {
            setEmailErr(true);
            setEmail(emailRef.current.value)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setDisplayName(displayNameRef.current.value);
        if (!validPassword.test(passwordRer)) {
            setPwdError(true);
        } else {
            setPassword(passwordRer.current.value);
        }
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
                    <button className="loginButton">
                        <Link to="/login">Sign In</Link>
                    </button>             
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
                        { emailErr && <p>Your email is invalid</p> }
                        { pwdError && <p>Your password is invalid</p> }
                    </form>
                ) }
            </div>
        </div>
    )
}

export default Register
