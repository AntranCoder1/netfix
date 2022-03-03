import React, { useState } from 'react';
import './CommentEdit.scss';
import { useDispatch } from 'react-redux';
import { editComment } from '../../redux/ApiMovieGCall';

const CommentEditG = ({ comment, setIsOpen, movies }) => {

    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text) {
            editComment(dispatch, movies._id, comment._id, text);
            setText('');
            setIsOpen(false);
        }
    };

    return (
        <div className="comment-update">
            <input 
                type="text" 
                name="text"
                className="comment-edit"
                defaultValue={comment.text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn-update" onClick={handleSubmit}>Update</button>
        </div>
    )
}

export default CommentEditG