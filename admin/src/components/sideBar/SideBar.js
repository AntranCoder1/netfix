import React from 'react';
import './SideBar.css';
import { 
    LineStyle, 
    Timeline, 
    TrendingUp,
    PermIdentity,
    Feedback,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,  
    MovieFilter,
    ListAlt
} from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';

const SideBar = () => {

    const isActive = {
        backgroundColor: "rgb(240, 240, 255)",
    };

    return (
        <div classNam="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <NavLink to="/home" activeClassName='active'>
                                <LineStyle className="sidebarIcon" />
                                Home
                            </NavLink>
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <NavLink to="/users" activeClassName='active'>
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </NavLink>
                        </li>
                        <li className="sidebarListItem">
                            <NavLink to="/products" activeClassName='active'>
                                <MovieFilter className="sidebarIcon" />
                                Movies
                            </NavLink>
                        </li>
                        <li className="sidebarListItem">
                            <NavLink to="/lists" activeClassName='active'>
                                <ListAlt className="sidebarIcon" />
                                Movies Lists
                            </NavLink>
                        </li>
                        <li className="sidebarListItem">
                            <NavLink to="/feedback" activeClassName='active'>
                                <Feedback className="sidebarIcon" />
                                Feedback
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <MailOutline className="sidebarIcon" />
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed className="sidebarIcon" />
                            Feeback
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutline className="sidebarIcon" />
                            Messages
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" />
                            Manager
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar
