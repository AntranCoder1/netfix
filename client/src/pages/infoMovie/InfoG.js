import React, { useEffect } from 'react';
import './Info.scss';
import Navbar from '../../components/navBar/NavBar';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import { timestampParser } from '../../Utils';
import axios from 'axios';

const InfoG = () => {

    const location = useLocation();
    const movieId = location.pathname.split('/')[2];
    const movies = useSelector(state => state.movie.movies);
    const [newMovie, setNewMovie] = useState([]);
    
    const TOKEN = JSON.parse(localStorage.getItem("userGoogle"))?.token;
    const userId = JSON.parse(localStorage.getItem("userGoogle"))?.user;

    const movieCheck = movies.filter((movie) => {
        if (movie._id === movieId) {
            return movie;
        }
    })

    const getView = async (id) => {
        try {
            await axios.patch(`/movies/view/${id}`, { id: userId }, {
                headers: {
                    token: "Bearer " + TOKEN
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
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
                                    <Link to={`/watch/${movie._id}`} onClick={() => getView(movie._id)}>
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
                        <div className="movie-desc-recom">
                            { newMovie.map((movie) => (
                                <div className="movie-desc-recom-card">
                                    <Link to={`/watch/${movie._id}`} onClick={() => getView(movie._id)}>
                                        <img src={movie.imgSm} alt="" className="img" />
                                    </Link>
                                    <Link to={`/watch/${movie._id}`} onClick={() => getView(movie._id)}>
                                        <h4>{movie.title}</h4>
                                    </Link>
                                    <div className="movie-desc-recom-card-tag">
                                        <LoyaltyOutlinedIcon className="icon" />
                                        <p>{movie.genre}</p>
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
            )) }
        </>
    )
}

export default InfoG