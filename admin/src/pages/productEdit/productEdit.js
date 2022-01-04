import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './productEdit.css';
import { Publish } from '@material-ui/icons';

const ProductEdit = () => {

    const location = useLocation();
    const movies = location.movie;

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
                        <input type="text" placeholder={movies.title} />
                        <label>Year</label>
                        <input type="text" placeholder={movies.year} />
                        <label>Genre</label>
                        <input type="text" placeholder={movies.genre} />
                        <label>Limit</label>
                        <input type="text" placeholder={movies.limit} />
                        <label>Trailer</label>
                        <input type="text" placeholder={movies.trailer} />
                        <label>Video</label>
                        <input type="text" placeholder={movies.video} />
                    </div>
                    <div className="productEditFormRight">
                        <div className="productEditUpload">
                            <img src={movies.img} alt="" className="productEditUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: 'none' }} />
                        </div>
                        <button className="productEditButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit
