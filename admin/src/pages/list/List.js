import React, { useEffect } from 'react';
import "./List.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../../redux/ApiCallList';

const List = () => {

    const lists = useSelector(state => state.list.lists);
    const dispatch = useDispatch();
    
    useEffect(() => {
        getList(dispatch);
    }, [dispatch]);

    const columns = [
        { field: "_id", headerName: "ID", width: 250 },
        { field: "title", headerName: "title", width: 250 },
        { field: "genre", headerName: "Genre", width: 200 },
        { field: "type", headerName: "type", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link
                            to={"/lists/" + params.row._id}
                        >
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            // onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={lists}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(r) => r._id}
            />
        </div>
    )
}

export default List
