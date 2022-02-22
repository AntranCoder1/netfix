import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { timestampParser, isEmpty } from '../../Utils';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/ApiUsersCall';
import { comment, getMovie } from '../../redux/ApiMovieCall';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentEdit from '../commentEdit/CommentEdit';

const Comment = ({ movies }) => {
    
    const user = useSelector(state => state.user.currentUser);
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false);

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
                        <div className="comment-text">
                            <p>{comment.text}</p>
                            <div className="comment-text-icon">
                                <EditIcon className="icon" onClick={() => setIsOpen(true)} />
                                <DeleteIcon className="icon" />
                            </div>
                        </div>
                        { isOpen && <CommentEdit comment={comment} setIsOpen={setIsOpen} movies={movies} /> }
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
                    <SendIcon className="comment-icon" />
                </form>
            ) }
        </div>
    )
}

export default Comment