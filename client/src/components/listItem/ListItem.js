import React, { useState, useEffect } from 'react';
import './ListItem.scss';
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
} from "@material-ui/icons";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListItem = ({ index, list }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    const user = JSON.parse(localStorage.getItem("persist:root")).user;
    const currentUser = user && JSON.parse(user).currentUser;
    const TOKEN = currentUser.token;

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/find/" + list, {
                    headers: {
                        token: "Bearer " + TOKEN 
                    }
                });
                setMovie(res.data);  
            } catch (error) {
                console.log(error);
            }
        };
        getMovie();
    }, [movie]);

    return (
        <Link to={{ pathname: "/watch", movie: movie }}>
            <div 
                className="listItem"
                style={{ left: isHovered && index * 255 - 50  + index * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie?.imgSm} alt="" />
                { isHovered && (
                    <>
                        <video src={movie.trailer} autoPlay={true} loop />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon" />
                                <Add className="icon" />
                                <ThumbUpAltOutlined className="icon" />
                                <ThumbDownOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{movie.duration}</span>
                                <span className="limit">+{movie.limit}</span>
                                <span>{movie.year}</span>
                            </div>
                            <div className="desc">{movie.desc}</div>
                            <div className="genre">{movie.genre}</div>
                        </div>
                    </>
                ) }
            </div>
        </Link>
    )
}

export default ListItem