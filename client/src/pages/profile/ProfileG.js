import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const ProfileG = ({ user }) => {

    const checkUserGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const checkImageGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.picture;
    const checkUserIdGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.user;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get("/users/find/" + checkUserIdGoogle);
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    }, []);

    return (
        <div className="profile">
            <div className="top">
                <div className="wrapper">
                    <img 
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="logo"
                    />
                </div>
            </div>
            { checkUserIdGoogle && (
                <>
                    <div className="container">
                        <h1>Who's watching?</h1>
                        <div className="container-user">
                            <Link to="/">
                                <div className="user">
                                    <img 
                                        src={ users.picture || checkImageGoogle || "https://i.pinimg.com/564x/1f/0d/78/1f0d78de9cf2a1358d2bece601a2a40f.jpg"} 
                                        alt="user-img"
                                    />
                                    <p>{ users.name || checkUserGoogle}</p>
                                </div>
                            </Link>
                            <Link to="/edit-profile">
                                <div className="edit-user">
                                    <p className="edit-user-btn">manage profiles</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </>      
            )}
        </div>
    )
}

export default ProfileG