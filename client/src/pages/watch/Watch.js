import React from 'react';
import "./Watch.scss";
import { ArrowBackOutlined } from '@material-ui/icons';

const Watch = () => {
    return (
        <div className="watch">
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            <video className="video" autoPlay progress controls src="https://firebasestorage.googleapis.com/v0/b/movie-24107.appspot.com/o/items%2F1637839950314trailerZig%20%26%20Sharko%20-%20Season%202%20Official%20Trailer%20(2016).mp4?alt=media&token=86c6d553-0f20-4a81-90f3-5a6a16662aae" />
        </div>
    )
}

export default Watch
