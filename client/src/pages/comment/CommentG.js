import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { timestampParser, isEmpty } from '../../Utils';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/ApiUsersCall';
import { getMovie, comment, deleteComment } from '../../redux/ApiMovieGCall';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentEditG from '../commentEdit/CommentEditG';

const CommentG = ({ movies }) => {

    const user = JSON.parse(localStorage.getItem("userGoogle"))?.user;
    const userImg = JSON.parse(localStorage.getItem("userGoogle"))?.picture;
    const userName = JSON.parse(localStorage.getItem("userGoogle"))?.name;
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
            comment(dispatch, movies._id, user, userName, text)
                .then(() => getMovie(dispatch))
                .then(() => setText(''));
        }
    }

    const commentMovie = movies.comments.filter((comment) => {
        if (comment.commenterId === user) {
            return comment
        }
    })

    const commentId = commentMovie.map((comment) => comment._id);

    const handleDelete = () => {
        deleteComment(dispatch, movies._id, commentId.join());
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
                                if (user._id === comment.commenterId) return user.picture || userImg;
                                else return null;
                            }).join("")}
                            alt="user-pic"     
                        />
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <h3>{comment.commenterUsername}</h3>
                            <span>{timestampParser(comment.timestamp)}</span>
                        </div>
                        <div className="comment-text">
                            <p>{comment.text}</p>
                            <div className="comment-text-icon">
                                { comment.commenterId === user && (
                                    <>
                                        <EditIcon className="icon" onClick={() => setIsOpen(!isOpen)} />
                                        <DeleteIcon className="icon" onClick={() => {
                                            if (window.confirm("Do you want to delete this comment ?")) {
                                                handleDelete();
                                            }
                                        }} />
                                    </>
                                ) }
                            </div>
                        </div>
                        { comment.commenterId === user && isOpen && (
                            <CommentEditG comment={comment} setIsOpen={setIsOpen} movies={movies} /> 
                        ) }
                    </div>
                </div>
            )) }
            { user && (
                <form className="comment-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="text"
                        placeholder="Leave a comment..."
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

export default CommentG