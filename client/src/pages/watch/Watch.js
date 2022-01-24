import React, { useState } from 'react';
import "./Watch.scss";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navBar/NavBar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const Watch = () => {

    const location = useLocation();
    const movieId = location.pathname.split("/")[2];

    const movies = useSelector(state => 
        state.movie.movies.find((item) => item._id === movieId)    
    )

    return (
        <div className="watch">
            <NavBar />
            <div className="watch-content">
                <div className="watch-video">
                    <video className="video" autoPlay progress controls src={movies.video} />
                </div>
                <div className="watch-title">
                    <h1 className="title">{movies.title}</h1>
                    <div className="feel">
                        <div className="feel-like">
                            <ThumbUpAltIcon className="icon" />
                            <p>Like</p>
                        </div>
                        <div className="feel-like">
                            <ChatIcon className="icon" />
                            <p>comment</p>
                        </div>
                        <div className="feel-like">
                            <ShareIcon className="icon" />
                            <p>Share</p>
                        </div>
                        <div className="feel-like">
                            <SaveAltIcon className="icon" />
                            <p>Save</p>
                        </div>
                    </div>
                </div>
                <div className="watch-bottom"></div>
                <div className="watch-desc">
                    <div className="left">
                        <div className="desc">{movies.desc}</div>
                    </div>
                    <div className="right">
                        <span>Genre: {movies.genre}</span>
                        <span>Year: {movies.year}</span>
                        <span>Time: {movies.limit}</span>
                    </div>
                </div>
                <div className="watch-img">
                    <img src={movies.imgTitle} alt="" />
                    <img src={movies.imgSm} alt="" />
                </div>
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
                    <p className="footer-break"></p>
                </div>
            </div>
        </div>
    )
}

export default Watch
