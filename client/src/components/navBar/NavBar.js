import React, { useState, useEffect } from 'react';
import './NavBar.scss';
import { ArrowDropDown, Notifications, Menu, Facebook } from "@material-ui/icons";
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/User.redux';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = (props) => {

    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [seatchItem, setSearchItem] = useState("");
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch(); 
    const history = useHistory();

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

    return (  
        // <nav>
        //     <div className="nav-center">
        //         <div className="nav-header">
        //             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="logo" />
        //             <Menu className="nav-toggle" onClick={() => setShowMediaIcons(!showMediaIcons)} />
        //         </div>
        //         <ul className={ showMediaIcons ? " links-mobie" : "links" }>
        //             <li>
        //                 <Link to="/">Homepage</Link>
        //             </li>
        //             <li>
        //                 <Link to="/series">Series</Link>
        //             </li>
        //             <li>
        //                 <Link to="/movies">Movies</Link>
        //             </li>
        //             <li>
        //                 <Link to="/newVideo">New Movies</Link>
        //             </li>
        //             <li>
        //                 <Link to="/movieCart">Liked Video</Link>
        //             </li>
        //             <li>
        //                 <Link to="/trending">Trending</Link>
        //             </li>
        //         </ul>

        //         <ul className="social-icons">
        //             <li>
        //                 <div id="wrap">
        //                     <form action="" autocomplete="on">
        //                         <input 
        //                             id="search"
        //                             name="search"
        //                             type="text"
        //                             placeholder="Search..."
        //                             value={seatchItem}
        //                             onChange={handleChange}
        //                         />
        //                         <input 
        //                             id="search_submit" 
        //                             value="Rechercher" 
        //                             type="submit"
        //                             onClick={callSearchFunction}
        //                         />
        //                     </form>
        //                 </div>
        //             </li>
        //             <li>
        //                 <p>{user.name}</p>
        //             </li>
        //             <li>
        //                 <Notifications className="icon" />
        //             </li>
        //             <li>
        //                 <img  
        //                     src={user.picture || "httpsi.pinimg.com/564x/4e/d4/ae/4ed4ae0981739ad8527eddddebbd428f.jpg"}
        //                     alt="netfix-user"
        //                 />
        //             </li>
        //             <li>
        //                 <div className="profile">
        //                     <ArrowDropDown className="icon" />
        //                     <div className="options">
        //                         <Link to={`/profile/${user._id}`}>
        //                             <span>Settings</span>
        //                         </Link>
        //                         <span onClick={handleLogout}>Logout</span>
        //                     </div>
        //                 </div>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
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
                    <span>{user.name}</span>
                    <Notifications className="icon" />
                    <img  
                        src={user.picture || "https://i.pinimg.com/564x/4e/d4/ae/4ed4ae0981739ad8527eddddebbd428f.jpg"}
                        alt="netfix-user"
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <Link to={`/profile/${user._id}`}>
                                <span>Settings</span>
                            </Link>
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar