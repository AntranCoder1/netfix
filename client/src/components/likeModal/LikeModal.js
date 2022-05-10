import React from 'react';
import './LikeModal.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const LikeModal = ({ setIsModal, id}) => {
    return (
        <div className="likeModal">
            <div className="likeModal-container">
                <DeleteForeverIcon className="likeModal-container-icon" />
                <p className="likeModal-container-p">Remove from liked video</p>
            </div>
        </div>
    )
}

export default LikeModal