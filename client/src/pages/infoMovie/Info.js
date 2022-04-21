import React, { useEffect, useState } from 'react';
import './Info.scss';
import Navbar from '../../components/navBar/NavBar';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import { timestampParser } from '../../Utils';
import axios from 'axios';
import SkeletonInfo from '../../components/skeleton/SkeletonInfo';
import MovieItem from '../../components/MovieItem/MovieItem';

const Info = () => {

    const location = useLocation();
    const movieId = location.pathname.split('/')[2];
    const movies = useSelector(state => state.movie.movies);
    const [newMovie, setNewMovie] = useState([]);
    const [loading, setLoading] = useState(false);

    const admin = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = admin && JSON.parse(admin).currentUser;
    const TOKEN = currentUser?.token;

    const user = useSelector(state => state.user.currentUser);

    const [movieSearch, setMovieSearch] = useState([]);

    const movieCheck = movies.filter((movie) => {
        if (movie._id === movieId) {
            return movie;
        }
    })

    const handleView = async (id) => {
        try {
            await axios.patch(`/movies/view/${id}`, { id: user._id }, {
                headers: {
                    token: "Bearer " + TOKEN
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const getMovie = async () => {
                const res = await axios.get("/movies", {
                    headers: {
                        token: "Bearer " + TOKEN
                    }
                })
                setNewMovie(res.data.sort((m1, m2) => {
                    return new Date(m2.createdAt) - new Date(m1.createdAt);
                }).slice(0, 6));
            };
            getMovie();
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = movieCheck.map((movie) => movie.title)
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
    }

    return (
        <>
            <Navbar search={search} />
            { movieSearch.length === 0 ? (
                <>
                    { movieCheck.map((movie) => (
                        <div className="movie-card">
                            <div className="img-gradient">
                                <img className="img-fluid" src={movie.img} alt="Sample image" />
                            </div>
                            <div className="movie-container">
                                <div className="container">
                                    <img src={movie.imgTitle} alt="" className="img-container" />
                                    <div className="container-center">
                                        <h2>{movie.title}</h2>
                                        <div className="container-center-genre">
                                            <LoyaltyOutlinedIcon className="icon" />
                                            <p style={{ marginRight: '20px' }}>{movie.genre}</p>
                                            <ScheduleOutlinedIcon className="icon" />
                                            <span>{timestampParser(movie.createdAt)}</span>
                                        </div>
                                        <div className="movie-card-btn">
                                            <button style={{ backgroundColor: '#3898ec' }}>Trailer</button>
                                            <Link to={`/watch/${movie._id}`} onClick={() => handleView(movie._id)}>
                                                <button style={{ backgroundColor: '#e46466' }}>Watching movies</button>
                                            </Link>
                                        </div>
                                        <p className="container-center-year">Year: {movie.year}</p>
                                        <p className="container-center-year">Time: {movie.limit} minute</p>
                                    </div>
                                </div>
                                <div className="movie-desc">
                                    <p>{movie.desc}</p>
                                    <div className="movie-desc-line"></div>
                                    <p style={{ color: "#f1b722", fontSize: "30px", }}>Office trailer:</p>
                                    <div className="movie-desc-video">
                                        <video 
                                            className="video" 
                                            progress 
                                            controls 
                                            src={movie.trailer}
                                        />
                                    </div>
                                    <p className="movie-desc-title">maybe you want to see</p>
                                </div>
                                { loading && <SkeletonInfo /> }
                                { !loading && 
                                    <div className="movie-desc-recom">
                                        { newMovie.map((movie) => (
                                            <div className="movie-desc-recom-card">
                                                <Link to={`/watch/${movie._id}`} onClick={() => handleView(movie._id)}>
                                                    <img src={movie.imgSm} alt="" className="img" />
                                                </Link>
                                                <Link to={`/watch/${movie._id}`} onClick={() => handleView(movie._id)}>
                                                    <h4>{movie.title}</h4>
                                                </Link>
                                                <div className="movie-desc-recom-card-tag">
                                                    <LoyaltyOutlinedIcon className="icon" />
                                                    <p>{movie.genre}</p>
                                                </div>
                                            </div>
                                        )) }
                                    </div>  
                                }
                            </div>
                        </div>
                    )) }
                </>
            ) : (
                <div className="movieSearch movie-card">
                    { movieSearch.map((item, i) => (
                        <MovieItem key={item._id} index={i} movie={item} />
                    )) }
                </div>
            ) }
        </>
    )
}

export default Info