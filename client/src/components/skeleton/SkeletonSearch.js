import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonSearch = () => {
    return (
        <div className="movie_card" id="bright">
            <>
                <div className="info_section">
                    <div className="movie_header">
                        <Skeleton height={120} width={197} />
                        <Skeleton height={121} />
                        {/* <h1 className="tooltip-on-hover">{movie.title}</h1>
                        <span className="tooltip">{movie.title}</span>
                        <h4>{movie.year}</h4>
                        <span className="minutes">{movie.limit} min</span>
                        <p className="type">{movie.genre}</p> */}
                    </div>
                    <div className="movie_desc">
                        <p className="text">
                            {/* {movie.desc}  */}
                        </p>
                    </div>
                    <div className="movie_social">
                        <ul>
                            {/* <li><ShareIcon /></li>
                            <li><FavoriteIcon /></li>
                            <li><ChatBubbleIcon /></li> */}
                        </ul>
                    </div>
                </div>
                <div className="blur_back bright_back">
                    {/* <img src={movie.imgSm} alt="" /> */}
                </div>
            </>
        </div>
    )
}

export default SkeletonSearch