import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './productEdit.css';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updatedMovie } from '../../redux/ApiCall';

const ProductEdit = () => {

    const [movie, setMovie] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const location = useLocation();
    const movieId = location.pathname.split('/')[2];

    const movies = useSelector(state => 
        state.movie.movies.find((item) => item._id === movieId)    
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const handleUpdate = () => {
        updatedMovie(movieId, movie, dispatch);
        history.push("/products");
    }

    return (
        <div className="productEdit">
            <div className="productEditContainer">
                <h1 className="productEditTitle">Movie</h1>
                <Link to="/newProduct">
                    <button className="productEditAddButton">Create</button>
                </Link>
            </div>
            <div className="productEditTop">
                <div className="productEditTopRight">
                    <div className="productEditInfoTop">
                        <img src={movies.img} alt="" className="productEditImg" />
                        <span className="productEditName">{movies.title}</span>
                    </div>
                    <div className="productEditInfoBottom">
                        <div className="productEditInfoItem">
                            <div className="productEditInfoKey">id:</div>
                            <div className="productEditInfoValue">{movies._id}</div>
                        </div>
                        <div className="productEditInfoItem">
                            <div className="productEditInfoKey">genre:</div>
                            <div className="productEditInfoValue">{movies.genre}</div>
                        </div>
                        <div className="productEditInfoItem">
                            <div className="productEditInfoKey">year:</div>
                            <div className="productEditInfoValue">{movies.year}</div>
                        </div>
                        <div className="productEditInfoItem">
                            <div className="productEditInfoKey">limit:</div>
                            <div className="productEditInfoValue">{movies.limit}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productEditBottom">
                <form className="productEditForm">
                    <div className="productEditFormLeft">
                        <label>Movie Title</label>
                        <input 
                            type="text" 
                            placeholder={movies.title} 
                            name="title" 
                            onChange={handleChange}
                        />
                        <label>Description</label>
                        <input 
                            type="text" 
                            placeholder={movies.desc} 
                            name="desc"
                            onChange={handleChange}
                        />
                        <label>Year</label>
                        <input 
                            type="text" 
                            placeholder={movies.year}
                            name="year" 
                            onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input 
                            type="text" 
                            placeholder={movies.genre}
                            name="genre"
                            onChange={handleChange}
                        />
                        <label>Limit</label>
                        <input 
                            type="text" 
                            placeholder={movies.limit}
                            name="limit"
                            onChange={handleChange}
                        />
                        <label>Trailer</label>
                        <input 
                            type="text" 
                            placeholder={movies.trailer}
                            name="trailer"
                            onChange={handleChange}
                        />
                        <label>Video</label>
                        <input 
                            type="text" 
                            name="video"
                            placeholder={movies.video}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="productEditFormRight">
                        <div className="productEditUpload">
                            <img src={movies.img} alt="" className="productEditUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: 'none' }} />
                        </div>
                        <button className="productEditButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit
