import React from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

const ProfileG = ({ user }) => {

    const checkUserGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const checkImageGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.picture;

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
            { checkUserGoogle && (
                <Link to="/">
                    <div className="container">
                        <img 
                            src={checkImageGoogle || "https://i.pinimg.com/564x/1f/0d/78/1f0d78de9cf2a1358d2bece601a2a40f.jpg"} 
                            alt="user-img"
                        />
                        <p>{checkUserGoogle}</p>
                    </div>
                </Link>   
            )}
        </div>
    )
}

export default ProfileG