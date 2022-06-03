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
import LanguageIcon from '@material-ui/icons/Language';
import { Trans ,useTranslation } from 'react-i18next';
import { getMovie } from "../../redux/ApiMovieCall";
import { useDispatch, useSelector } from "react-redux";

const filterMovies = (movies, query) => {
    if (!query) {
      return movies;
    }
  
    return movies.filter((movie) => {
      const movieName =  movie.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      return movieName;
    });
};

const NewVideo = () => {

    const movies = useSelector(state => state.movie.movies);

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { search } = window.location;
    const query = new URLSearchParams(search).get("search");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const filteredMovie = filterMovies(movies, searchQuery);

    const admin = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = admin && JSON.parse(admin).currentUser;
    const TOKEN = currentUser?.token;

    const { t } = useTranslation();
    const { i18n } = useTranslation();

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

    useEffect(() => {
        getMovie(dispatch);
    }, [dispatch]);

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    useEffect(() => {
        document.title = "Netflix - New Movie"
    });

    return (
        <div className="new-video">
            <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="new-video-container">
                <div className="container">
                    { !searchQuery ? (
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
                            { filteredMovie.map((item, i) => (
                                <MovieItem key={item._id} index={i} movie={item} />
                            )) }
                        </div>
                    ) }
                </div>
                <Scroll />
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
                                <Trans t={t}>footer-column1-link-3"</Trans>
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
            </div>
        </div>
    )
}

export default NewVideo