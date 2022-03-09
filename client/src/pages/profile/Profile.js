import React from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

const Profile = ({ user }) => {

    const users = useSelector(state => state.user.currentUser);

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
            { users && (
                <>
                    <div className="container">
                        <h1>Who's watching?</h1>
                        <div className="container-user">
                            <Link to="/">
                                <div className="user">
                                    <img 
                                        src={user.picture || "https://i.pinimg.com/564x/1f/0d/78/1f0d78de9cf2a1358d2bece601a2a40f.jpg"} 
                                        alt="user-img"
                                    />
                                    <p>{user.name}</p>
                                </div>
                            </Link>
                            <div className="edit-user">
                                <p className="edit-user-btn">manage profiles</p>
                            </div>
                        </div>
                    </div>
                </>      
            )}
        </div>
    );
};

export default Profile;
