import React, { useState } from 'react';
import './MovieItem.scss';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie, index }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="movie_card" id="bright">
            <Link to={`/watch/${movie._id}`}>
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
                                    autoPlay 
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
        </div>
    );
};

export default MovieItem;
