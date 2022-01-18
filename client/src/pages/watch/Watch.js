import React from 'react';
import "./Watch.scss";
import { ArrowBackOutlined } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Watch = () => {

    const location = useLocation();
    const movieId = location.pathname.split("/")[2];

    const movies = useSelector(state => 
        state.movie.movies.find((item) => item._id === movieId)    
    )

    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
                <p>{movies.desc}</p>
            </Link>
            <video className="video" autoPlay progress controls src={movies.video} />
        </div>
    )
}

export default Watch
