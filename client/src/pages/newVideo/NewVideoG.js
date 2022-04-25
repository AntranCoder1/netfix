import React, { useEffect, useState } from 'react';
import './NewVideo.scss';
import NavbarG from '../../components/navBar/NavbarG';
import UpdateIcon from '@material-ui/icons/Update';
import axios from 'axios';
import { timestampParser } from '../../Utils';
import { Link } from 'react-router-dom'; 
import Scroll from '../../components/scroll/Scroll';
import SkeletonNewMovie from '../../components/skeleton/SkeletonNewMovie';
import MovieItem from '../../components/MovieItem/MovieItem';

const NewVideoG = () => {

    const [movie, setMovie] = useState([]);
    const TOKEN = JSON.parse(localStorage.getItem("userGoogle"))?.token;
    const [loading, setLoading] = useState(false);
    const [movieSearch, setMovieSearch] = useState([]);

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
        }, 5000);
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        document.title = 'Netflix - New video'
    }, []);

    return (
        <div className="new-video">
            <NavbarG search={search} />
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

export default NewVideoG