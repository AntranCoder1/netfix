import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { timestampParser, isEmpty } from '../../Utils';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/ApiUsersCall';
import { comment, getMovie } from '../../redux/ApiMovieCall';

const Comment = ({ movies }) => {
    
    const user = useSelector(state => state.user.currentUser);
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    const [text, setText] = useState("");

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text) {
            comment(dispatch, movies._id, user._id, user.name, text)
                .then(() => getMovie(dispatch))
                .then(() => setText(''));
        }
    }

    return (
        <div className="comments-container">
            { movies.comments.map((comment) => (
                <div className={
                    comment.commenterId === user._id
                        ? "comment-container client"
                        : "comment-container"
                }>
                    <div className="left-part">
                        <img 
                            src={!isEmpty(users[0]) && users.map((user) => {
                                if (user._id === comment.commenterId) return user.picture;
                                else return null;
                            }).join("")}
                            alt="user-pic"     
                        />
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <div className="comment-user">
                                <h3>{comment.commenterUsername}</h3>
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>
                        </div>
                        <p>{comment.text}</p>
                    </div>
                </div>
            )) }
            { user._id && (
                <form className="comment-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="text"
                        placeholder="Leave a comment"
                        className="comment-text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <br />
                    <input 
                        type="submit" 
                        value="To Send" 
                        className="submit"
                    />
                </form>
            ) }
        </div>
    )
}

export default Comment