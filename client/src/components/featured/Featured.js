import React from 'react';
import './Featured.scss';
import { PlayArrow, InfoOutlined } from '@material-ui/icons';

const Featured = () => {
    return (
        <div className="featured">
            <img
                src="https://firebasestorage.googleapis.com/v0/b/movie-24107.appspot.com/o/items%2F1637839950309imgbackground_desktop2.jpg?alt=media&token=b9b3014e-3d14-4757-8d42-b54a9d855d06"
                alt=""
            />
            <div className="info">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/movie-24107.appspot.com/o/items%2F1637839950313imgTitlebackground_desktop3.jpg?alt=media&token=7abf63eb-8bd5-4951-bd82-b04065413665"
                    alt=""
                />
                <span className="desc">
                    Zig & Sharko 🦞😻 ANIMAL CROSSING 🦞😻 Amazing MAGIC TRICK 🎭 
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured
