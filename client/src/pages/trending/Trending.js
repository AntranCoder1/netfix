import React, { useState, useEffect, useRef } from 'react';
import './Trending.scss';
import NavBar from '../../components/navBar/NavBar';
import UpdateIcon from '@material-ui/icons/Update';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, timestampParser } from '../../Utils';
import Scroll from '../../components/scroll/Scroll';
import SkeletonTrending from '../../components/skeleton/SkeletonTrending';
import MovieItem from '../../components/MovieItem/MovieItem';
import axios from 'axios';
import { ContactSupportOutlined } from '@material-ui/icons';
import LanguageIcon from '@material-ui/icons/Language';
import { Trans, useTranslation } from 'react-i18next';

const Trending = () => {

    const movies = useSelector(state => state.movie.movies);
    const users = useSelector(state => state.users.users);
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(false);

    const currentUser = useSelector(state => state.user.currentUser);
    const [movieSearch, setMovieSearch] = useState([]);
    const [value, setValue] = useState("");

    const TOKEN = currentUser.token;

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            if (!isEmpty(users[0])) {
                const movieArr = Object.keys(movies).map((i) => movies[i]);
                let sortedArr = movieArr.sort((a, b) => {
                    return b.view.length - a.view.length;
                });
    
                let sort = sortedArr.filter((i) => i.likers.length !== 0)
                setTrend(sort)
            }
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const search = async (searchValue) => {
        try {
            const res = await axios.get(`/movies/search?value=${searchValue}`, {
                headers: {
                    token: "Bearer " + TOKEN
                }
            });
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
        <div className="trending">
            <NavBar search={search} />
            <div className="trending-container">
                { loading && <SkeletonTrending /> }
                { !loading && 
                    <div className="trending-container-loading">
                        { movieSearch.length === 0 ? (
                            <>
                                { trend.map((movie) => (
                                    <Link to={`/watch/${movie._id}`}>
                                        <div className="content">
                                            <img src={movie.img} alt="" />
                                            <div className="content-title">
                                                <h3>{movie.title}</h3>
                                                <div className="content-title-genre">
                                                    <p className="genre">{movie.genre}</p>
                                                    <CheckCircleIcon className="icon" style={{ marginRight: "5px" }} />
                                                    <span className="like" style={{ marginRight: "5px" }}>{movie.view.length} lượt xem</span>
                                                    <UpdateIcon className="icon" />
                                                    <p className="update">
                                                        Đã được cập nhập -
                                                        <span className="time-update"> {timestampParser(movie.createdAt)}</span>
                                                    </p>
                                                </div>
                                                <p className="desc">
                                                    {movie.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )) }
                            </>
                        ) : (
                            
                            <div className="movie-search">
                                { movieSearch.map((item, i) => (
                                    <MovieItem key={item._id} index={i} movie={item} />
                                )) }
                            </div>
                        ) }
                    </div>
                }
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
            </div>
        </div>
    )
}

export default Trending