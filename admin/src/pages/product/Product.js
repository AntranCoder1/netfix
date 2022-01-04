import React, { useEffect, useState } from 'react';
import './Product.css';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from '../../redux/ApiCall';

const Product = () => {

    const movies = useSelector(state => state.movie.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const handleChangeDelete = (id) => {
        // setProduct(products.filter(item => item.id !== id));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'img', headerName: 'Movie Image', width: 160, renderCell: (params) => {
            return (
                <div className="userListUser">
                    <img src={params.row.img} alt="" className="userListImg" />
                </div>
            )
        } },
        { field: 'title', headerName: 'Movie Name', width: 200 },
        { field: 'genre', headerName: 'Genre', width: 250 },
        { field: 'year', headerName: 'Year', width: 120 },
        { field: 'limit', headerName: 'Limit', width: 120 },
        { field: 'isSeries', headerName: 'isSeries', width: 130 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
            return (
                <>
                    <Link to={{ pathname: "/products/" + params.row._id, movie: params.row }}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={() => handleChangeDelete(params.id)} />
                </>
            )
        } }
    ]

    return (
        <div className="product">
            <DataGrid
                rows={movies}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                getRowId={row => row._id}
            />
        </div>
    )
}

export default Product
