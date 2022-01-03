import React, { useEffect } from 'react';
import './Product.css';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
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
        { field: 'movie', headerName: 'Movie', width: 170, renderCell: (params) => {
            return (
                <div className="userListUser">
                    <img src={params.row.img} alt="" className="userListImg" />
                </div>
            )
        } },
        { field: 'genre', headerName: 'Genre', width: 300 },
        { field: 'year', headerName: 'Year', width: 120 },
        { field: 'limit', headerName: 'Limit', width: 120 },
        { field: 'isSeries', headerName: 'isSeries', width: 120 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
            return (
                <>
                    <Link to={"/products/" + params.id}>
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
                getRowId={r => r._id}
            />
        </div>
    )
}

export default Product
