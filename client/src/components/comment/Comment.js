import React, { useState } from 'react';
import './Comment.scss';
import { useDispatch, useSelector } from 'react-redux';
import { timestampParser } from '../../Utils';

const Comment = ({ movie }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.currentUser);

    const checkUserGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const checkImageGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.picture;

    return (
        <div className="comments-container">
            <div className="comment-container client">
                <div className="left-part">
                    <img src={checkImageGoogle || user.picture || "https://i.pinimg.com/564x/98/3a/b7/983ab747cecfcfc94b4d1ab3daa2f5cd.jpg"} alt="user-comment" />
                </div>
                <div className="right-part">
                    <div className="comment-header">
                        <div className="username">
                            <h3>{checkUserGoogle || user.name}</h3>
                        </div>
                        <span>{timestampParser()}</span>
                    </div>
                    <p>Phim hay quá đi mất</p>
                </div>
            </div>
            <form className="comment-form">
                <input 
                    type="text"
                    name="text"
                    placeholder="Leave a comment"
                />
                <br />
                <input type="submit" value="To send" />
            </form>
        </div>
    );
};

export default Comment;
