import React, { useRef, useState } from 'react';
import './Register.scss';
import faqsData from '../../fixtures/faqs.json';
import Accodion from '../../components/accodion/Accodion';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import LanguageIcon from '@material-ui/icons/Language';
import { Trans, useTranslation } from 'react-i18next';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const histoty = useHistory();

    const { t } = useTranslation();
    const { i18n } = useTranslation();

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

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
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
                        <div className="trans">
                            <LanguageIcon className="trans-icon" />
                            <select onClick={changeLanguage}>
                                <option value="en">English</option>
                                <option value="vn">Tiếng Việt</option>
                            </select>
                        </div>
                        <Link to="/login">
                            <button className="loginButton">{t("register-sign")}</button>
                        </Link>
                    </div>
                </div>
                <div className="container">
                    <h1>
                        <Trans t={t}>register-container-h1</Trans>
                    </h1>
                    <h2>
                        <Trans t={t}>register-container-h2</Trans>
                    </h2>
                    <p>
                        <Trans t={t}>register-container-p</Trans>
                    </p>
                    { !email ? (
                        <div className="input">
                            <input type="email" placeholder={t("register-container-input")} ref={emailRef} />
                            <button 
                                className="registerButton"
                                onClick={handleStart}
                            >
                            {t("register-container-button")}
                            </button>
                        </div>
                    ) : (
                        <form className="input">
                            <input type="text" placeholder={t("register-container-user")} ref={nameRef} />
                            <input type="password" placeholder={t("register-container-pass")} ref={passwordRef} />
                            <button 
                                className="registerButton"
                                onClick={handleFinish}
                            >
                                <Trans t={t}>register-container-btn</Trans>
                            </button>
                        </form>
                    ) }
                </div>
            </div>
            <div className="our-story-card animation-card freePlanAndroid">
                <div className="animation-card-container">
                    <div className="our-story-card-text">
                        <h1 id className="our-story-card-title">
                            <Trans t={t}>register-container-download</Trans>
                        </h1>
                        <h2 id className="our-story-card-subTitle">
                            <Trans t={t}>register-container-download-title</Trans>
                        </h2>
                        <a href="https://play.google.com/store/apps/details?id=com.netflix.mediaclient">
                            <div className="getapp">
                                <p className="getapptext">
                                    <Trans t={t}>register-container-download-btn</Trans>
                                </p>
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
                <Accodion.Title>
                    <Trans t={t}>accordion-title</Trans>
                </Accodion.Title>
                {/* { faqsData.map((item) => 
                    <Accodion.Item key={item.id}>
                        <Accodion.Header>{item.header}</Accodion.Header>
                        <Accodion.Body>{item.body}</Accodion.Body>
                    </Accodion.Item>
                ) } */}
                <Accodion.Item>
                    <Accodion.Header>
                        <Trans t={t}>accordion-header-1</Trans>
                    </Accodion.Header>
                    <Accodion.Body>
                        <Trans t={t}>accordion-body-1</Trans>
                    </Accodion.Body>
                </Accodion.Item>

                <Accodion.Item>
                    <Accodion.Header>
                        <Trans t={t}>accordion-header-2</Trans>
                    </Accodion.Header>
                    <Accodion.Body>
                        <Trans t={t}>accordion-body-2</Trans>
                    </Accodion.Body>
                </Accodion.Item>

                <Accodion.Item>
                    <Accodion.Header>
                        <Trans t={t}>accordion-header-3</Trans>
                    </Accodion.Header>
                    <Accodion.Body>
                        <Trans t={t}>accordion-body-3</Trans>
                    </Accodion.Body>
                </Accodion.Item>

                <Accodion.Item>
                    <Accodion.Header>
                        <Trans t={t}>accordion-header-4</Trans>
                    </Accodion.Header>
                    <Accodion.Body>
                        <Trans t={t}>accordion-body-4</Trans>
                    </Accodion.Body>
                </Accodion.Item>

                <Accodion.Item>
                    <Accodion.Header>
                        <Trans t={t}>accordion-header-5</Trans>
                    </Accodion.Header>
                    <Accodion.Body>
                        <Trans t={t}>accordion-body-5</Trans>
                    </Accodion.Body>
                </Accodion.Item>

                <p className="accodion-intro">
                    <Trans t={t}>accodion-intro</Trans>
                </p>
                <div className="accodion-input">
                    <input type="email" placeholder={t("accodion-input")} />
                    <button className="accodion-registerButton">
                        <Trans t={t}>accodion-registerButton</Trans>
                        <img src="/images/icons/chevron-right.png" alt='Get Started' />
                    </button>
                </div>
            </Accodion>
            <div className="footer">
                <div className="footer-title">
                    <Trans t={t}>footer-title</Trans>
                </div>
                <p className="footer-break"></p>
                <div className="footer-row">
                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/node/412" className="footer-link">
                            <Trans t={t}>footer-column1-link-1</Trans>
                        </a>
                        <a href="https://ir.netflix.net/ir-overview/profile/default.aspx" className="footer-link">
                            <Trans t={t}>footer-column1-link-2</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/privacy" className="footer-link">
                            <Trans t={t}>footer-column1-link-3</Trans>
                        </a>
                        <a href="https://fast.com/" className="footer-link">
                            <Trans t={t}>footer-column1-link-4</Trans>
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/" className="footer-link">
                            <Trans t={t}>footer-column2-link-1</Trans>
                        </a>
                        <a href="https://jobs.netflix.com/" className="footer-link">
                            <Trans t={t}>footer-column2-link-2</Trans>
                        </a>
                        <a href="#" className="footer-link">
                            <Trans t={t}>footer-column2-link-3</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/notices" className="footer-link">
                            <Trans t={t}>footer-column2-link-4</Trans>
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="/login" className="footer-link">
                            <Trans t={t}>footer-column3-link-1</Trans>
                        </a>
                        <a href="https://devices.netflix.com/fr/" className="footer-link">
                            <Trans t={t}>footer-column3-link-2</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/corpinfo" className="footer-link">
                            <Trans t={t}>footer-column3-link-3</Trans>
                        </a>
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">
                            <Trans t={t}>footer-column3-link-4</Trans>
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">
                            <Trans t={t}>footer-column4-link-1</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/termsofuse" className="footer-link">
                            <Trans t={t}>footer-column4-link-2</Trans>
                        </a>
                        <a href="https://help.netflix.com/vi/contactus" className="footer-link">
                            <Trans t={t}>footer-column4-link-3</Trans>
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
                <p className="footer-break"></p>        
                <p className="footer-text">Netflix Vietnam</p>
            </div>
        </>
    )    
}

export default Register

