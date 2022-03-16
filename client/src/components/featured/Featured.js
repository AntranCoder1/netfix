import React, { useEffect, useState } from 'react';
import './Featured.scss';
import { PlayArrow, InfoOutlined } from '@material-ui/icons';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Featured = ({ type, setGenre }) => {

    const [content, setContent] = useState({});

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`/movies/random?type=${type}`, {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E5MjI1NjcwNjI5M2YzODNkOTJhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDc2MTM3MywiZXhwIjoxODk5OTYxMzczfQ.K6PUlRVEpHvOiJEOQWB6t8s3Q1fvLoEvZHdiLGt-0Zk"
                    }
                })
                setContent(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getRandomContent();
    }, [type]);


    return (
        <div className="featured">
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
            <img
                src={content.img}
                alt=""
            />
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
                        <Link to={`/watch/${content._id}`} style={{ display: 'flex', alignItems: 'center' }}>
                            <PlayArrow />
                            <span>Play</span>
                        </Link>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured
