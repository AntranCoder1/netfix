import React, { useEffect, useState } from 'react';
import './Widgetlg.css';
import axios from 'axios';
import { dateParser } from '../../Utils';

const Widgetlg = () => {

    const [newMovieList, setNewMovieList] = useState([]);
    const admin = JSON.parse(localStorage.getItem("persist:root")).admin;
    const currentAdmin = admin && JSON.parse(admin).currentAdmin;
    const TOKEN = currentAdmin.token;

    useEffect(() => {
        const getNewMovieList = async () => {
            try {
                const res = await axios.get("/lists?new=true", {
                    headers: {
                        token: "Bearer " + TOKEN
                    },
                })
                setNewMovieList(res.data.sort((l1, l2) => {
                    return new Date(l2.createdAt) - new Date(l1.createdAt);
                }));
            } catch (error) {}
        };
        getNewMovieList();
    }, []);

    // const Button = ({ type }) => {
    //     return <button className={"widgetlgButton " + type}>{type}</button>
    // }

    return (
        <div className="Widgetlg">
            <h3 className="widgetlgTitle">List of latest movies</h3>
            <table className="widgetlgTable">
                <tr className="widgetlgTr">
                    <th className="widgetlgTh">Title</th>
                    <th className="widgetlgTh">Genre</th>
                    <th className="widgetlgTh">Type</th>
                    <th className="widgetlgTh">Date created</th>
                </tr>
                
                { newMovieList.map((list) => (
                    <tr className="widgetlgTr" key={list._id}>
                        <td className="widgetlgUser">
                            <span className="widgetlgName">{list.title}</span>
                        </td>
                        <td className="widgetlgDate">{list.genre}</td>
                        <td className="widgetlgAmount">{list.type}</td>
                        <td className="widgetlgStatus">
                            {dateParser(list.createdAt)}
                        </td>
                    </tr>
                )) }
            </table>
        </div>
    )
}

export default Widgetlg
