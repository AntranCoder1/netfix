import React, { useEffect, useState } from 'react';
import './Featured.scss';
import { PlayArrow, InfoOutlined, ContactlessRounded } from '@material-ui/icons';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SkeletonFeature from '../skeleton/SkeletonFeature';

const Featured = ({ type, setGenre }) => {

    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const getRandomContent = async () => {
                try {
                    const res = await axios.get(`/movies/random?type=${type}`, {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E5MjI1NjcwNjI5M2YzODNkOTJhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDc2MTM3MywiZXhwIjoxODk5OTYxMzczfQ.K6PUlRVEpHvOiJEOQWB6t8s3Q1fvLoEvZHdiLGt-0Zk"
                        }
                    })
                    setContent(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getRandomContent();
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer)
    }, [type]);

    const handleView = async () => {
        try {
            await axios.patch(`/movies/view/${content._id}`, { id: currentUser._id }, {
                headers: {
                    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E5MjI1NjcwNjI5M2YzODNkOTJhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDc2MTM3MywiZXhwIjoxODk5OTYxMzczfQ.K6PUlRVEpHvOiJEOQWB6t8s3Q1fvLoEvZHdiLGt-0Zk"
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="featured">
            { loading && <SkeletonFeature /> }
            { !loading && 
                <>
                    {
                        type && (
                            <div className="category">
                                <span>{type === "movies" ? "Movies" : "Series"}</span>
                                <select 
                                    name="genre" 
                                    id="genre"
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    <option>Genre</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Historical">Historical</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Sci-fi">Sci-fi</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Western">Western</option>
                                    <option value="Animation">Animation</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Documentary">Documentary</option>
                                    <option value="Action">Action</option>
                                    <option value="Detective">Detective</option>
                                </select>
                            </div>
                        )
                    }
                    { content.map((content) => (
                        <>
                            <img src={content.img} alt="" />
                            <div className="info">
                                <img
                                    src={content.imgTitle}
                                    alt=""
                                />
                                <span className="desc">
                                    {content.desc}
                                </span>
                                <div className="buttons">
                                    <button className="play">
                                        <Link 
                                            to={`/watch/${content._id}`} 
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            onClick={handleView}
                                        >
                                            <PlayArrow />
                                            <span>Play</span>
                                        </Link>
                                    </button>
                                    <button className="more">
                                        <Link 
                                            to={`/info/${content._id}`} 
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <InfoOutlined />
                                            <span>Info</span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </>
                    )) }
                </>    
            }
        </div>
    )
}

export default Featured
