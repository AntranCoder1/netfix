import React, { useEffect, useState } from 'react';
import './NewVideo.scss';
import NavBar from '../../components/navBar/NavBar';
import UpdateIcon from '@material-ui/icons/Update';
import axios from 'axios';
import { timestampParser } from '../../Utils';
import { Link } from 'react-router-dom'; 
import Scroll from '../../components/scroll/Scroll';
import SkeletonNewMovie from '../../components/skeleton/SkeletonNewMovie';
import MovieItem from '../../components/MovieItem/MovieItem';

const NewVideo = () => {

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movieSearch, setMovieSearch] = useState([]);
    const [value, setValue] = useState("");

    const admin = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = admin && JSON.parse(admin).currentUser;
    const TOKEN = currentUser?.token;

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const getMovie = async () => {
                const res = await axios.get("/movies", {
                    headers: {
                        token: "Bearer " + TOKEN
                    }
                })
                setMovie(res.data.sort((m1, m2) => {
                    return new Date(m2.createdAt) - new Date(m1.createdAt);
                }).slice(0, 10));
            };
            getMovie();
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const search = async (searchValue) => {
        try {
            const res = await axios.get(`/movies/search?value=${searchValue}`, {
                headers: {
                    token: "Bearer " + TOKEN
                }
            })
            setMovieSearch(res.data);
            setValue(searchValue);
        } catch (error) {
            console.log(error);
        }
    };

    if (movieSearch.length === 0) {
        document.title = "Netflix - Trending"; 
    } else {
        document.title = `(${movieSearch.length}) ${value} - Netflix`;
        window.history.replaceState('', '', `/movies/search?value=${value}`);   
    }

    return (
        <div className="new-video">
            <NavBar search={search} />
            <div className="new-video-container">
                <div className="container">
                    { movieSearch.length === 0 ? (
                        <>
                            { loading && <SkeletonNewMovie /> }
                            { !loading &&
                                <>
                                    { movie.map((movie) => (
                                        <Link to={`/watch/${movie._id}`}>
                                            <div className="content">
                                                <img src={movie.img} alt="" />
                                                <div className="content-title">
                                                    <h3>{movie.title}</h3>
                                                    <div className="content-title-genre">
                                                        <p className="genre">{movie.genre}</p>
                                                        <UpdateIcon className="icon" />
                                                        <p className="update">Đã được cập nhập <span className="time-update">{timestampParser(movie.createdAt)}</span></p>
                                                    </div>
                                                    <p className="desc">
                                                        {movie.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )) }
                                </>
                            }
                        </>
                    ) : (
                        <div className="movie-search">
                            { movieSearch.map((item, i) => (
                                <MovieItem key={item._id} index={i} movie={item} />
                            )) }
                        </div>
                    ) }
                </div>
                <Scroll />
                <div className="footer">
                    <div className="footertop">
                        <h4>You have questions? Contact us.</h4>
                    </div>
                    <div className="footer-links">
                        <ul className="list-1">
                            <li><a href="https://help.netflix.com/vi/node/412">Frequently asked questions</a></li>
                            <li><a href="https://ir.netflix.net/ir-overview/profile/default.aspx">Investor Relation</a></li>
                            <li><a href="https://help.netflix.com/legal/privacy">Privacy</a></li>
                            <li><a href="https://fast.com/">Speed test</a></li>
                        </ul>
                        <ul className="list-1">
                            <li><a href="https://help.netflix.com/vi/">Help Center</a></li>
                            <li><a href="https://jobs.netflix.com/">Jobs</a></li>
                            <li><a href="#">Cookie options</a></li>
                            <li><a href="https://help.netflix.com/legal/notices">policy notification</a></li>
                        </ul>
                        <ul className="list-1">
                            <li><a href="/login">Account</a></li>
                            <li><a href="https://devices.netflix.com/fr/">Ways to Watch</a></li>
                            <li><a href="https://help.netflix.com/legal/corpinfo">Business information</a></li>
                            <li><a href="https://www.netflix.com/vn-en/browse/genre/839338">Only available on Netflix</a></li>
                        </ul>
                        <ul className="list-1">
                            <li><a href="https://www.netflix.com/vn-en/browse/genre/839338">Multimedia Center</a></li>
                            <li><a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a></li>
                            <li><a href="https://help.netflix.com/vi/contactus">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-bottom">
                        <h4>Netflix Việt Nam</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewVideo