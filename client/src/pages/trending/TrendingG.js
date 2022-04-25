import React, { useState, useEffect } from 'react';
import './Trending.scss';
import NavbarG from '../../components/navBar/NavbarG';
import UpdateIcon from '@material-ui/icons/Update';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, timestampParser } from '../../Utils';
import Scroll from '../../components/scroll/Scroll';
import SkeletonTrending from '../../components/skeleton/SkeletonTrending';
import axios from 'axios';
import MovieItem from '../../components/MovieItem/MovieItem';

const TrendingG = () => {

    const movies = useSelector(state => state.movie.movies);
    const users = useSelector(state => state.users.users);
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(false);

    const currentUser = useSelector(state => state.user.currentUser);
    const TOKEN = currentUser.token;

    const [movieSearch, setMovieSearch] = useState([]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            if (!isEmpty(users[0])) {
                const movieArr = Object.keys(movies).map((i) => movies[i]);
                let sortedArr = movieArr.sort((a, b) => {
                    return b.likers.length - a.likers.length;
                });
    
                let sort = sortedArr.filter((i) => i.likers.length !== 0)
                setTrend(sort)
            }
            setLoading(false);
        }, 5000);
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        document.title = 'Netflix - Trending'
    }, []);

    return (
        <div className="trending">
            <NavbarG search={search} />
            <div className="trending-container">
                { movieSearch.length === 0 ? (
                    <>
                        { loading && <SkeletonTrending /> }
                        { !loading && 
                            <div className="trending-container-loading">
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
                            </div>
                        }
                        <Scroll />
                    </>
                ) : (
                    <div className="movieSearch movie-card">
                        { movieSearch.map((item, i) => (
                            <MovieItem key={item._id} index={i} movie={item} />
                        )) }
                    </div>
                ) }
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

export default TrendingG