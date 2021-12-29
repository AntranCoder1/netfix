import React, { useEffect, useState } from 'react';
import './Home.scss';
import NavBar from '../../components/navBar/NavBar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from 'axios';

const Home = ({ type }) => {

    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomList = async () => {
            try {
                const res = await axios.get(
                    `/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E5MjI1NjcwNjI5M2YzODNkOTJhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDc2MTM3MywiZXhwIjoxODk5OTYxMzczfQ.K6PUlRVEpHvOiJEOQWB6t8s3Q1fvLoEvZHdiLGt-0Zk"
                        },
                    }
                );
                setLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getRandomList();
    }, [type, genre]);

    return (
        <div className="home">
            <NavBar />
            <Featured type={type} setGenre={setGenre} />
            <List />
        </div>
    )
}

export default Home
