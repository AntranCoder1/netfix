import React, { useEffect, useState, useRef } from 'react';
import "./Watch.scss";
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../../components/navBar/NavBar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ChatIcon from '@material-ui/icons/Chat';
import axios from 'axios';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import Modal from '../../components/modal/Modal';
import ShareModal from '../../components/shareModal/ShareModal';
import fileDownload from 'js-file-download';

const Watch = () => {

    const location = useLocation();
    const movieId = location.pathname.split("/")[2];
    const [movieList, setMovieList] = useState([]);
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const movieReco = useRef();

    const movies = useSelector(state => 
        state.movie.movies.find((item) => item._id === movieId)    
    );

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get(`/movies/randomMovie?genre=${movies.genre}`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjU0Mzg3OSwiZXhwIjoxOTAxNzQzODc5fQ.2Urif1oO5B4Kc_jnhmgmbuZVjpjcArhaQEpEF4dTYIA"
                    }
                })
                setMovieList(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    }, []);

    const handleClick = (direction) => {

        setIsMoved(true);

        const distance = movieReco.current.getBoundingClientRect().x - 50;

        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            movieReco.current.style.transform = `translateX(${320 + distance}px)`;
        }

        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            movieReco.current.style.transform = `translateX(${-320 + distance}px)`;
        }
    };

    const handleDownload = (url, filename) => {
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, filename)
            })
    };

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
                            <ChatIcon className="icon" onClick={() => setIsOpen(true)} />
                            <p>Feedback</p>
                            { isOpen && <Modal setIsOpen={setIsOpen} /> }
                        </div>
                        <div className="feel-like">
                            <ShareIcon className="icon" onClick={() => setIsModal(true)} />
                            <p>Share</p>
                            { isModal && <ShareModal setIsModal={setIsModal} movies={movies} /> }
                        </div>
                        <div className="feel-like">
                            <SaveAltIcon className="icon" />
                            <p onClick={handleDownload(movies.video, 'test-download.png')}>Save</p>
                        </div>
                    </div>
                </div>
                <div className="watch-bottom"></div>
                <div className="watch-desc">
                    <div className="left">
                        <div className="desc">{movies.desc}</div>
                    </div>
                    <div className="right">
                        <span>Genre: <span style={{ color: '#ff4d4d' }}>{movies.genre}</span></span>
                        <span>Year: {movies.year}</span>
                        <span>Time: {movies.limit} minute</span>
                    </div>
                </div>
                <div className="watch-img">
                    <img src={movies.imgTitle} alt="" />
                    <img src={movies.imgSm} alt="" />
                </div>
                <div className="watch-reco">
                    <div className="slider">
                        <h1>Recommend for you</h1>
                        <div className="arrow">
                            <ArrowBackIosOutlined
                                className="sliderArrow left"
                                onClick={() => handleClick("left")}
                                style={{ display: !isMoved && "none" }}
                            />
                            <ArrowForwardIosOutlined
                                className="sliderArrow right"
                                onClick={() => handleClick("right")}
                            />
                        </div>
                    </div>
                    <div className="watch-recommend" style={{ display: 'flex' }} ref={movieReco}>
                        { movieList.map((item) => (
                            <Link to={`/watch/${item._id}`}>
                                <div class="zoomin content">
                                    <img src={item.img} title={item.title} />
                                </div>
                            </Link>
                        )) }
                    </div>
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
