import React, { useState,useEffect } from 'react';
import './NewList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMovies } from '../../redux/ApiCall';
import { addList } from '../../redux/ApiCallList';

const NewList = () => {

    const [list, setList] = useState(null);
    const history = useHistory();
    const movies = useSelector(state => state.movie.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value })
    };

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({ ...list, [e.target.name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addList(list, dispatch);
        history.push("/lists");
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New List</h1>
            <form className="addProductForm">
                <div className="formLeft">
                    <div className="addProductItem">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Popular Movies"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Genre</label>
                        <input
                            type="text"
                            placeholder="action"
                            name="genre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Type</label>
                        <select name="type" onChange={handleChange}>
                            <option>Type</option>
                            <option value="movies">Movie</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                </div>
                <div className="formRight">
                    <div className="addProductItem">
                        <label>Content</label>
                        <select
                            multiple
                            name="content"
                            onChange={handleSelect}
                            style={{ height: "280px" }}
                        >
                            {movies.map((movie) => (
                                <option key={movie._id} value={movie._id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button 
                    className="addProductButton"
                    onClick={handleSubmit}
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewList