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
    const history = useHistory();

    const checkUserGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const checkImageGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.picture;
    const checkIdGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.user;

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true );
        return () => (window.onscroll = null);
    };

    const handleLogout = () => {
        dispatch(logout())
        history.push("/register")
    }

    const handleClick = () => {
        localStorage.removeItem("userGoogle");
        history.push("/register")
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
                    <Link to="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    </Link>
                    <Link to="/">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies">
                        <span>Movies</span>
                    </Link>
                    <Link to="/newVideo">
                        <span>New Movies</span>
                    </Link>
                    <Link to="/movieCart">
                        <span>Liked Video</span>
                    </Link>
                    <Link to="/trending">
                        <span>Trending</span>
                    </Link>
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
                                <Link to={`/profile/${user._id}`}>
                                    <span>Settings</span>
                                </Link>
                                <span onClick={handleLogout}>Logout</span>
                            </div>
                        ) : (
                            <div className="options">
                                <Link to={`/profile/${user._id}`}>
                                    <span>Settings</span>
                                </Link>
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