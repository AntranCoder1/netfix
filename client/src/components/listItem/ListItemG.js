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

const ListItemG = ({ index, list }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    const TOKEN = JSON.parse(localStorage.getItem("userGoogle"))?.token;
    const currentUser = JSON.parse(localStorage.getItem("userGoogle"))?.user;

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

    const handleView = async () => {
        try {
            await axios.patch(`/movies/view/${movie._id}`, { id: currentUser }, {
                headers: {
                    token: "Bearer " + TOKEN
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Link to={`/watch/${movie._id}`} onClick={handleView}>
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

export default ListItemG