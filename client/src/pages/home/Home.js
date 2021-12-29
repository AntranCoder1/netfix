import React from 'react';
import './Home.scss';
import NavBar from '../../components/navBar/NavBar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';

const Home = () => {
    return (
        <div className="home">
            <NavBar />
            <Featured />
            <List />
        </div>
    )
}

export default Home
