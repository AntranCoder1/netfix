import React, { useState } from 'react';
import './Comment.scss';
import { timestampParser } from '../../Utils';
import { useSelector, useDispatch } from 'react-redux';

const Comment = ({ movies }) => {

    const usersData = useSelector(state => state.user.currentUser);

    return (
        <div className="comments-container">
            { movies.comments.map((comment) => (
                <div className="comment-container">
                    <div className="left-part">
                        <img 
                            src={usersData._id === comment.commenterId ? usersData.picture : ""}
                            alt="user-pic"     
                        />
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <div className="comment-user">
                                <h3>admin</h3>
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>
                        </div>
                        <p>{comment.text}</p>
                    </div>
                </div>
            )) }
            <form className="comment-form">
                <input 
                    type="text"
                    name="text"
                    placeholder="Leave a comment"
                    className="comment-text"
                />
                <br />
                <input 
                    type="submit" 
                    value="To Send" 
                    className="submit"
                />
            </form>
        </div>
    )
}

export default Comment