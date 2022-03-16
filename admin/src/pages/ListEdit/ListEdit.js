import React, { useState } from 'react';
import "./ListEdit.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updatedList } from '../../redux/ApiCallList';

const ListEdit = () => {

    const [lists, setLists] = useState(null);
    const location = useLocation();
    const listId = location.pathname.split('/')[2];

    const list = useSelector(state => 
        state.list.lists.find((item) => item._id === listId)  
    );

    const movies = useSelector(state => state.movie.movies);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        setLists({ ...lists, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updatedList(listId, lists, dispatch);
        history.push("/lists");
    };

    const movieList = movies.filter((item) => {
        if (item.genre === list.genre) {
            return item.title;
        }
    })

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List Edit</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{list.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{list.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input 
                            type="text" 
                            placeholder={list.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Type</label>
                        <input 
                            type="text" 
                            placeholder={list.type}
                            name="type"
                            onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input 
                            type="text" 
                            placeholder={list.genre}
                            name="genre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="editProductItem">
                            <label>Content</label>
                            <select
                                multiple
                                name="content"
                                style={{ height: "180px", width: "173%", marginTop: "10px" }}
                            >
                                { movieList.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        { item.title }
                                    </option>
                                )) }
                            </select>
                        </div>
                        <button 
                            className="productButton"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ListEdit
