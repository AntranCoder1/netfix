import React, { useEffect } from 'react';
import './UserList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/ApiCallUser';
import { dateParser } from '../../Utils'; 

const UserList = () => {

    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();
    
    useEffect(() => {
        getUser(dispatch);
    }, [dispatch]);

    console.log(users);

    const handleChangeDelete = (id) => {
        // setUser(user.filter(item => item.id !== id));
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'picture', headerName: 'User Image', width: 150, renderCell: (params) => {
            return (
                <div className="userListUser">
                    <img src={params.row.picture || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="" className="userListImg" />
                    {params.row.username}
                </div>
            )
        } },
        { field: 'name', headerName: 'User Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'isAdmin', headerName: 'IsAdmin', width: 140 },
        { field: 'createdAt', headerName: 'Registration Time', width: 200, renderCell: (params) => {
            return (
                <div className="userListUser">
                    {dateParser(params.row.createdAt)}
                </div>
            )
        } },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/users/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleChangeDelete(params.id)} />
                    </>
                )
            }
        }
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={users}
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

export default UserList
