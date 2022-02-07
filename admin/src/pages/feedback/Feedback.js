import React, { useEffect } from 'react';
import './Feedback.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { getFeedback } from '../../redux/ApiFeedbackCall';
import { useSelector, useDispatch } from 'react-redux';

const Feedback = () => {

    const feed = useSelector(state => state.feedback.feedbacks);
    const dispatch = useDispatch();

    useEffect(() => {
        getFeedback(dispatch);
    }, [dispatch]);

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'phone', headerName: 'Phone', width: 120 },
        { field: 'feedback', headerName: 'Feedback', width: 200 },
        { field: 'content', headerName: 'content', width: 250 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
            return (
                <DeleteOutline className="userListDelete" />
            )
        } }
    ]

    return (
        <div className="feedback">
            <DataGrid
                rows={feed}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                getRowId={row => row._id}
            />
        </div>
    );
};

export default Feedback;
