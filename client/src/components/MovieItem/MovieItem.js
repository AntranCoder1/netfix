import React, { useEffect, useState } from 'react';
import './MovieItem.scss';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MovieItem = ({ movie, index }) => {

    const [isHovered, setIsHovered] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser);

    const handleView = async () => {
        try {
            await axios.patch(`/movies/view/${movie._id}`, { id: currentUser._id }, {
                headers: {
                    token: "Bearer " + currentUser.token
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="movie_card" id="bright">
            { movie ? (
                <>
                    <Link to={`/info/${movie._id}`} onClick={handleView}>
                        <>
                            <div className="info_section">
                                <div 
                                    className="movie_header"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <img 
                                        className="locandina" 
                                        src={movie.imgTitle}    
                                    />
                                    { isHovered && (
                                        <video 
                                            className="video" 
                                            src={movie.trailer} 
                                            autoPlay={true} 
                                            loop 
                                            progress 
                                            controls    
                                        />
                                    ) }
                                    <h1 className="tooltip-on-hover">{movie.title}</h1>
                                    <span className="tooltip">{movie.title}</span>
                                    <h4>{movie.year}</h4>
                                    <span className="minutes">{movie.limit} min</span>
                                    <p className="type">{movie.genre}</p>
                                </div>
                                <div className="movie_desc">
                                    <p className="text">
                                        {movie.desc} 
                                    </p>
                                </div>
                                <div className="movie_social">
                                    <ul>
                                        <li><ShareIcon /></li>
                                        <li><FavoriteIcon /></li>
                                        <li><ChatBubbleIcon /></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blur_back bright_back">
                                <img src={movie.imgSm} alt="" />
                            </div>
                        </>
                    </Link>
                </>
            ) : (
                <div className="movie-card-filter">
                    <h2>T??M KI???M</h2>
                </div>
            ) }
        </div>
    );
};

export default MovieItem;
