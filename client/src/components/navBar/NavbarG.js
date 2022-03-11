import React, { useEffect, useState } from 'react';
import './NavBar.scss';
import { ArrowDropDown, Notifications } from "@material-ui/icons";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const NavbarG = (props) => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [seatchItem, setSearchItem] = useState("");

    const history = useHistory();

    const checkUserGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const checkImageGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.picture;
    const checkIdGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.user;

    const [user, setUser] = useState([]);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true );
        return () => (window.onscroll = null);
    };

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

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get("/users/find/" + checkIdGoogle)
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    }, []);

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
                    <span>{ user.name || checkUserGoogle}</span>
                    <Notifications className="icon" />
                    <img  
                        src={ user.picture || checkImageGoogle || "https://i.pinimg.com/564x/4e/d4/ae/4ed4ae0981739ad8527eddddebbd428f.jpg"}
                        alt="netfix-user"
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <Link to={`/profile/${checkIdGoogle}`}>
                                <span>Settings</span>
                            </Link>
                            <span onClick={handleClick}>Logout Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarG