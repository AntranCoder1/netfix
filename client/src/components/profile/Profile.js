import React from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';

const Profile = () => {

    const user = useSelector(state => state.user.currentUser);

    return (
        <div className="profile">
            <div className="top">
                <div className="wrapper">
                    <img 
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                </div>
            </div>
            <div className="container">
                <h1>Who's watching?</h1>
                <ul className="list" >
                    <li data-testid="user-profile">
                        <img 
                            src="https://i.pinimg.com/564x/4e/d4/ae/4ed4ae0981739ad8527eddddebbd428f.jpg" 
                            alt="user-img"     
                        />
                        <p className="name">{user.name}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
