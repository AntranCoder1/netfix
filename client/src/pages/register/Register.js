import React, { useRef, useState } from 'react';
import './Register.scss';
import faqsData from '../../fixtures/faqs.json';
import Accodion from '../../components/accodion/Accodion';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import LanguageIcon from '@material-ui/icons/Language';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const histoty = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value)
    }

    const handleFinish = async (e) => {
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setName(nameRef.current.value);
        try {
            await axios.post("/auth/register", { email, name, password }); 
            histoty.push("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="register">
                <div className="top">
                    <div className="wrapper">
                        <img 
                            className="logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                            alt=""
                        />
                        <Link to="/login">
                            <button className="loginButton">Sign In</button>
                        </Link>
                    </div>
                </div>
                <div className="container">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel at any time.</h2>
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
                            <input type="text" placeholder="Username" ref={nameRef} />
                            <input type="password" placeholder="Password" ref={passwordRef} />
                            <button 
                                className="registerButton"
                                onClick={handleFinish}
                            >
                                Start
                            </button>
                        </form>
                    ) }
                </div>
            </div>
            <div className="our-story-card animation-card freePlanAndroid">
                <div className="animation-card-container">
                    <div className="our-story-card-text">
                        <h1 id className="our-story-card-title">
                            Have an Android Phone? Get our new free plan!
                        </h1>
                        <h2 id className="our-story-card-subTitle">
                            Watch a selection of new movies and TV shows without adding any payment details!
                        </h2>
                        <a href="https://play.google.com/store/apps/details?id=com.netflix.mediaclient">
                            <div className="getapp">
                                <p className="getapptext">Get the app</p>
                                <img className="getappimg" src="/images/icons/chevron-right.png" alt='Get Started' />
                            </div>
                        </a>
                    </div>
                    <div className="our-story-card-img-container">
                        <img 
                            alt="" 
                            className="our-story-card-img" 
                            src="https://assets.nflxext.com/ffe/siteui/acquisition/ab36101/nmhp/vn.jpg" 
                        />
                    </div>
                </div>
            </div>
            <Accodion>
                <Accodion.Title>Frequently Asked Questions</Accodion.Title>
                { faqsData.map((item) => 
                    <Accodion.Item key={item.id}>
                        <Accodion.Header>{item.header}</Accodion.Header>
                        <Accodion.Body>{item.body}</Accodion.Body>
                    </Accodion.Item>
                ) }
                <p className="accodion-intro">
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                <div className="accodion-input">
                    <input type="email" placeholder="Email address" />
                    <button className="accodion-registerButton">
                        Get Started
                        <img src="/images/icons/chevron-right.png" alt='Get Started' />
                    </button>
                </div>
            </Accodion>
            <div className="footer">
                <div className="footer-title">Question? Contact us.</div>
                <p className="footer-break"></p>
                <div className="footer-row">
                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/node/412" className="footer-link">FAQ</a>
                        <a href="https://ir.netflix.net/ir-overview/profile/default.aspx" className="footer-link">Investor Relations</a>
                        <a href="https://help.netflix.com/legal/privacy" className="footer-link">Privacy</a>
                        <a href="https://fast.com/" className="footer-link">Speed test</a>
                    </div>

                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/" className="footer-link">Help Center</a>
                        <a href="https://jobs.netflix.com/" className="footer-link">Jobs</a>
                        <a href="#" className="footer-link">Cookie Preferences</a>
                        <a href="https://help.netflix.com/legal/notices" className="footer-link">Legal Notices</a>
                    </div>

                    <div className="footer-column">
                        <a href="/login" className="footer-link">Account</a>
                        <a href="https://devices.netflix.com/fr/" className="footer-link">Ways to Watch</a>
                        <a href="https://help.netflix.com/legal/corpinfo" className="footer-link">Corporate Information</a>
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">Only on Netflix</a>
                    </div>

                    <div className="footer-column">
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">Media Center</a>
                        <a href="https://help.netflix.com/legal/termsofuse" className="footer-link">Terms of Use</a>
                        <a href="https://help.netflix.com/vi/contactus" className="footer-link">Contact Us</a>
                    </div>
                </div>
                <div className="trans">
                    <LanguageIcon className="trans-icon" />
                    <select>
                        <option>English</option>
                        <option>Tiếng Việt</option>
                    </select>
                </div>
                <p className="footer-break"></p>
                <p className="footer-text">Netflix Vietnam</p>
            </div>
        </>
    )    
}

export default Register

