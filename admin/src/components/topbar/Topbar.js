import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useSelector } from "react-redux"; 

const Topbar = () => {

    const admin = useSelector(state => state.admin.currentAdmin);
    
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">NETFLIX</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <img 
                        src={admin.picture || "https://i.pinimg.com/564x/6b/b6/bf/6bb6bf1f7c0a97e7daabf783d1153b3d.jpg"} 
                        alt="avatar" 
                        className="topAvatar"
                    />
                </div>
            </div>
        </div>
    )
}

export default Topbar
