import React, { useEffect, useState } from 'react';
import './MovieCart.scss';
import NavbarG from '../../components/navBar/NavbarG';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieCartG = () => {

    const user = JSON.parse(localStorage.getItem("userGoogle"))?.user;
    const userName = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const userImg = JSON.parse(localStorage.getItem("userGoogle"))?.picture;
    const movies = useSelector(state => state.movie.movies);

    const [users, setUsers] = useState([]);

    const check = movies.map((movie) => {
        if (movie.likers.includes(user)) {
            return movie;
        }
    })

    const filtered = check.filter(function(el) {
        return el !== undefined
    });

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get("/users/find/" + user);
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    }, []);

    return (
        <div className="movie-cart">
            <NavbarG />
            <div className="movie-container">
                <div className="left">
                    <p className="left-title">Video đã thích</p>
                    <p style={{ fontSize: "15px", color: "#ccc" }}>
                        <span>{filtered.length} </span> 
                        Video
                    </p>
                    <div className="left-security">
                        <LockOutlinedIcon className="left-icon" />
                        <p style={{ fontSize: "13px", fontWeight: "bold", color: "#e0e0d1" }}>Riêng tư</p>
                    </div>
                    <div className="left-bottom"></div>
                    <div className="left-user">
                        <img src={ users.picture || userImg} alt="" />
                        <p className="left-user-name">{ users.name || userName}</p>
                    </div>
                </div>
                <div className="right">
                    { filtered.map((movie) => (
                        <div className="right-right">
                            <div className="right-content">
                                {/* <span style={{ fontSize: "20px" }}>0</span> */}
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
        </div>
    )
}

export default MovieCartG