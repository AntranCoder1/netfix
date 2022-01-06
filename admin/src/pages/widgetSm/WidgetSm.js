import React, { useEffect, useState } from 'react';
import './WidgetSm.css';
import { Visibility } from '@material-ui/icons';
import axios from 'axios';

const WidgetSm = () => {

    const [newUser, setNewUser] = useState([]);
    const admin = JSON.parse(localStorage.getItem("persist:root")).admin;
    const currentAdmin = admin && JSON.parse(admin).currentAdmin;
    const TOKEN = currentAdmin.token;

    useEffect(() => {
        const getNewUser = async() => {
           try {
                const res = await axios.get("/users?new=true", {
                    headers: {
                        token: "Bearer " + TOKEN
                    },
                })
                setNewUser(res.data);
            } catch (error) {}
        };
        getNewUser();
    }, []);

    console.log(newUser)

    return (
        <div className="widgetsm">
            <span className="widgetsmTitle">New Join Members</span>
            <ul className="widgetsmList">
                { newUser.map((user) => (
                    <li className="widgetsmListItem" key={user._id}>
                        <img src={user.picture || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="" className="widgetsmImg" />
                        <div className="widgetsmuser">
                            <span className="widgetsmUsername">{user.name}</span>
                            <span className="widgetsmUserTitle">{user.email}</span>
                        </div>
                        <button className="widgetsmButton">
                            <Visibility className="widgetsmIcon" />
                            Display
                        </button>
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default WidgetSm
