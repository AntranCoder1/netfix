import React, { useState, useEffect } from 'react';
import './NavBar.scss';
import { ArrowDropDown, Notifications, Menu, Facebook } from "@material-ui/icons";
import { Link, useHistory, NavLink } from 'react-router-dom';
import { logout } from '../../redux/User.redux';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SkeletonNavbar from '../skeleton/SkeletonNavbar';
import { Trans, useTranslation } from 'react-i18next';

const NavBar = ({ searchQuery, setSearchQuery }) => {

    const [isScrolled, setIsScrolled] = useState(false);
    const user = useSelector(state => state.user.currentUser);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch(); 
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true );
        return () => (window.onscroll = null);
    };

    const handleLogout = () => {
        dispatch(logout())
        history.push("/register")
    }

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const getCurrentUser = async () => {
                try {
                    const res = await axios.get("/users/find/" + user._id);
                    setUsers(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getCurrentUser();
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery) {
            history.push("/newVideo");
        } else {
            history.push(`?search=${searchQuery}`);
        }
    };

    return (  
        <div className={ isScrolled ? "navBar scrolled" : "navBar"}>
            <div className="container">
                <div className="left">
                    <Link to="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    </Link>
                    <NavLink to="/" exact activeClassName='active-link'>
                        <span>
                            <Trans t={t}>Navbar-1</Trans>
                        </span>
                    </NavLink>
                    <NavLink to="/series" activeClassName='active-link'>
                        <span>
                            <Trans t={t}>Navbar-2</Trans>
                        </span>
                    </NavLink>
                    <NavLink to="/movies" activeClassName='active-link'>
                        <span>
                            <Trans t={t}>Navbar-3</Trans>
                        </span>
                    </NavLink>
                    <NavLink to="/newVideo" activeClassName='active-link'>
                        <span>
                            <Trans t={t}>Navbar-4</Trans>
                        </span>
                    </NavLink>
                    <NavLink to="/movieCart" activeClassName='active-link'>
                        <span>
                            <Trans t={t}>Navbar-5</Trans>
                        </span>
                    </NavLink>
                    <NavLink to="/trending" activeClassName='active-link'>
                        <span>
                            <Trans t={t}>Navbar-6</Trans>
                        </span>
                    </NavLink>
                </div>
                <div className="right">
                    <div id="wrap">
                        <form action="" method="get" autocomplete="off" onSubmit={onSubmit}>
                            <input 
                                id="search"
                                name="search"
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onInput={(e) => setSearchQuery(e.target.value)}
                            />
                            <input 
                                id="search_submit" 
                                value="Rechercher" 
                                type="submit"
                            />
                        </form>
                    </div>
                    { loading && <SkeletonNavbar /> }
                    { !loading &&
                        <>
                            <span>{users.name}</span>
                            <Notifications className="icon" />
                            <img  
                                src={users.picture || "https://i.pinimg.com/564x/4e/d4/ae/4ed4ae0981739ad8527eddddebbd428f.jpg"}
                                alt="netfix-user"
                            />
                        </>
                    }
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <Link to={`/profile/${users._id}`}>
                                <span style={{ display: 'flex', flexWrap: 'wrap', paddingRight: '2px' }}>
                                    <Trans t={t}>Profile-setting</Trans>
                                </span>
                            </Link>
                            <span onClick={handleLogout}>
                                <Trans t={t}>Profile-logout</Trans>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar