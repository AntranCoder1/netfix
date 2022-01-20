import React, { useEffect, useState } from 'react';
import './NavBar.scss';
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/User.redux';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = (props) => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [seatchItem, setSearchItem] = useState("");
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch(); 

    const checkUserGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const checkImageGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.picture;

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true );
        return () => (window.onscroll = null);
    };

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleClick = () => {
        localStorage.removeItem("userGoogle");
    }

    const handleChange = e => {
        setSearchItem(e.target.value)
    }

    const resetInputField = () => {
        setSearchItem("")
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(seatchItem);
    }

    console.log(seatchItem)

    return (
        <div className={ isScrolled ? "navBar scrolled" : "navBar"}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <Link to="/">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies">
                        <span>Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    { user ? (
                        <>
                            <div id="wrap">
                                <form action="" autocomplete="on">
                                    <input 
                                        id="search"
                                        name="search"
                                        type="text"
                                        placeholder="Search..."
                                        value={seatchItem}
                                        onChange={handleChange}
                                    />
                                    <input 
                                        id="search_submit" 
                                        value="Rechercher" 
                                        type="submit"
                                        onClick={callSearchFunction}
                                    />
                                </form>
                            </div>
                            <span>{user.name}</span>
                            <Notifications className="icon" />
                            <img  
                                src={user.picture || "https://i.pinimg.com/564x/4e/d4/ae/4ed4ae0981739ad8527eddddebbd428f.jpg"}
                                alt="netfix-user"
                            />
                        </>
                    ) : (
                        <>
                            <div id="wrap">
                                <form action="" autocomplete="on">
                                    <input 
                                        id="search"
                                        name="search"
                                        type="text"
                                        placeholder="Search..."
                                        value={seatchItem}
                                        onChange={handleChange}
                                    />
                                    <input 
                                        id="search_submit" 
                                        value="Rechercher" 
                                        type="submit"
                                        onClick={callSearchFunction}
                                    />
                                </form>
                            </div>
                            <span>{checkUserGoogle}</span>
                            <Notifications className="icon" />
                            <img  
                                src={checkImageGoogle || "https://i.pinimg.com/564x/4e/d4/ae/4ed4ae0981739ad8527eddddebbd428f.jpg"}
                                alt="netfix-user"
                            />
                        </>    
                    ) }
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        { user ? (
                            <div className="options">
                                <span>Settings</span>
                                <span onClick={handleLogout}>Logout</span>
                            </div>
                        ) : (
                            <div className="options">
                                <span>Settings</span>
                                <span onClick={handleClick}>Logout Google</span>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar