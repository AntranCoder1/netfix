import React, { useState, useEffect } from 'react';
import './ListItem.scss';
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
} from "@material-ui/icons";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListItem = ({ index, list }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    const currentUser = useSelector(state => state.user.currentUser)

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/find/" + list, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E5MjI1NjcwNjI5M2YzODNkOTJhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDc2MTM3MywiZXhwIjoxODk5OTYxMzczfQ.K6PUlRVEpHvOiJEOQWB6t8s3Q1fvLoEvZHdiLGt-0Zk"
                    }
                });
                setMovie(res.data);  
            } catch (error) {
                console.log(error);
            }
        };
        getMovie();
    }, [movie]);

    const addView = async () => {
        try {
            await axios.patch(`/movies/view/${movie._id}`, { id: currentUser._id }, {
                headers: {
                    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E5MjI1NjcwNjI5M2YzODNkOTJhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDc2MTM3MywiZXhwIjoxODk5OTYxMzczfQ.K6PUlRVEpHvOiJEOQWB6t8s3Q1fvLoEvZHdiLGt-0Zk"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // { pathname: "/watch", movie: movie }

    return (
        <Link to={`/watch/${movie._id}`} onClick={addView}>
            <div 
                className="listItem"
                style={{ left: isHovered && index * 255 - 50  + index * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie?.imgSm} alt="" />
                { isHovered && (
                    <>
                        <video src={movie.trailer} autoPlay={true} loop />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon" />
                                <Add className="icon" />
                                <ThumbUpAltOutlined className="icon" />
                                <ThumbDownOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{movie.duration}</span>
                                <span className="limit">+{movie.limit}</span>
                                <span>{movie.year}</span>
                            </div>
                            <div className="desc">{movie.desc}</div>
                            <div className="genre">{movie.genre}</div>
                        </div>
                    </>
                ) }
            </div>
        </Link>
        // <div className="container">
        //     <a href="#" className="item">
        //         <img src={movie?.imgSm} alt="Animals" />
        //     </a>
        // </div>
        // <ul className="items">
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Orange is the new black</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Ugly Betty</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Big</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>The Apprentice</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Veep</h2>
        //             </div>
        //         </a>
        //     </li>
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Orange is the new black</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Ugly Betty</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Big</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>The Apprentice</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Veep</h2>
        //             </div>
        //         </a>
        //     </li>
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Orange is the new black</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Ugly Betty</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Big</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>The Apprentice</h2>
        //             </div>
        //         </a>
        //     </li>
            
        //     <li>
        //         <img classNam="bg-img" src="https://loremflickr.com/320/240" />
        //         <a href="#">
        //             <div class="content">
        //                 <h2>Veep</h2>
        //             </div>
        //         </a>
        //     </li>
        // </ul>

    )
}

export default ListItem