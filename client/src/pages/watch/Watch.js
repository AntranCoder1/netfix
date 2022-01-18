import React from 'react';
import "./Watch.scss";
import { ArrowBackOutlined } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Watch = () => {

    const location = useLocation();
    const movie = location.movie;

    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
                <p>{movie.desc}</p>
            </Link>
            <video className="video" autoPlay progress controls src={movie.video} />
        </div>
    )
}

export default Watch
