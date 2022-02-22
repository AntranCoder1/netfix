import React from 'react';
import './CommentEdit.scss';

const CommentEdit = ({ comment, setIsOpen }) => {
    return (
        <div className="comment-update" onClick={() => setIsOpen(false)}>
            <input 
                type="text" 
                name="text"
                className="comment-edit"
                autoFocus="true"
                defaultValue={comment.text}
            />
            <input type="submit" value="Update" className="btn-update" />
        </div>
    )
}

export default CommentEdit