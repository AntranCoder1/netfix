import React from 'react';
import './ListItem.scss';
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
} from "@material-ui/icons";

const ListItem = () => {
    return (
        <div className="listItem">
            <img src="https://firebasestorage.googleapis.com/v0/b/movie-24107.appspot.com/o/items%2F1637839950314imgSmbackground_desktop3.jpg?alt=media&token=61308191-1276-490b-a3e3-860f4bd2c77c" alt="" />
            <video src="https://firebasestorage.googleapis.com/v0/b/movie-24107.appspot.com/o/items%2F1637839950314trailerZig%20%26%20Sharko%20-%20Season%202%20Official%20Trailer%20(2016).mp4?alt=media&token=86c6d553-0f20-4a81-90f3-5a6a16662aae" autoPlay={true} loop />
            <div className="itemInfo">
                <div className="icons">
                    <PlayArrow className="icon" />
                    <Add className="icon" />
                    <ThumbUpAltOutlined className="icon" />
                    <ThumbDownOutlined className="icon" />
                </div>
                <div className="itemInfoTop">
                    <span>29.50</span>
                    <span className="limit">+</span>
                    <span>2021</span>
                </div>
                <div className="desc">Zig & Sharko 🦞😻 ANIMAL CROSSING 🦞😻 Amazing MAGIC TRICK 🎭 </div>
                <div className="genre">Animation</div>
            </div>
        </div>
    )
}

export default ListItem