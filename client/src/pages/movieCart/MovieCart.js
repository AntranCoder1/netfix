import React, { useEffect, useState } from 'react';
import './MovieCart.scss';
import NavBar from '../../components/navBar/NavBar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SkeletonLike from '../../components/skeleton/SkeletonLike';
import MovieItem from '../../components/MovieItem/MovieItem';

const MovieCart = () => {

    const user = useSelector(state => state.user.currentUser);
    const movies = useSelector(state => state.movie.movies);
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movieSearch, setMovieSearch] = useState([]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const getMovieLike = async () => {
                try {
                    const res = await axios.get("/movies/getLikeMovie/" + user._id, {
                        headers: {
                            token: "Bearer " + user.token
                        }
                    })
                    setFiltered(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getMovieLike();
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const check = filtered.filter((el) => {
        return el !== null;
    });

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get("/users/find/" + user._id);
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    }, []);

    const search = async (searchValue) => {
        try {
            const res = await axios.get(`/movies/search?value=${searchValue}`, {
                headers: {
                    token: "Bearer " + user.token
                }
            })
            setMovieSearch(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        document.title = 'Netflix - liked video'
    }, []);

    return (
        <div className="movie-cart">
            <NavBar search={search} />
            { movieSearch.length === 0 ? (
                <>
                    { loading && <SkeletonLike /> }
                    { !loading &&
                        <div className="movie-container">
                            <div className="left">
                                <p className="left-title">Video đã thích</p>
                                <p style={{ fontSize: "15px", color: "#ccc" }}>
                                    <span>{check.length} </span> 
                                    Video
                                </p>
                                <div className="left-security">
                                    <LockOutlinedIcon className="left-icon" />
                                    <p style={{ fontSize: "13px", fontWeight: "bold", color: "#e0e0d1" }}>Riêng tư</p>
                                </div>
                                <div className="left-bottom"></div>
                                <div className="left-user">
                                    <img src={users.picture} alt="" />
                                    <p className="left-user-name">{users.name}</p>
                                </div>
                            </div>
                            <div className="right">
                                { check.map((movie) => (
                                    <div className="right-right">
                                        <div className="right-content">
                                            <span style={{ fontSize: "20px" }}>
                                                { check.indexOf(movie) + 1 }
                                            </span>
                                            <Link to={`/watch/${movie._id}`}>
                                                <>
                                                    <div className="right-title">
                                                        <img src={movie.img} alt="" />
                                                        <div className="right-genre">
                                                            <p style={{ fontWeight: "500" }}>{movie.title}</p>
                                                            <p style={{ fontSize: "15px", color: "#ccc", marginTop: "20px" }}>
                                                                {movie.genre}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            </Link>
                                        </div>
                                        <div className="right-bottom"></div>
                                    </div>
                                )) }
                            </div>
                        </div>
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
    )
}

export default MovieCart