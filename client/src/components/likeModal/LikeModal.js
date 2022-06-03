import React, { useEffect, useState } from 'react';
import './LikeModal.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { disLikeMovie, getMovieLike } from '../../redux/ApiMovieGCall';

const LikeModal = ({ setIsModal, movieId}) => {

    const userId =  JSON.parse(localStorage.getItem("userGoogle"))?.user;
    const TOKEN = JSON.parse(localStorage.getItem("userGoogle"))?.token;
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);

    const movies = useSelector(state => 
        state.movie.movies.find((item) => item._id === movieId)    
    );

    const handleDislike = () => {
        disLikeMovie(dispatch, userId, movieId);
        setIsLiked(false);
        window.location.reload();
    }

    useEffect(() => {
        if (movies.likers.includes(userId)) setIsLiked(true);
        else setIsLiked(false);
    }, [userId, movies.likers, isLiked]);

    useEffect(() => {
        getMovieLike(dispatch, userId)
    })

    return (
        <div className="likeModal">
            <div className="likeModal-container" onClick={handleDislike}>
                <DeleteForeverIcon className="likeModal-container-icon" />
                <p className="likeModal-container-p">Remove from liked video</p>
            </div>
        </div>
    )
}

export default LikeModal