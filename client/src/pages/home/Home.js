import React, { useEffect, useState } from 'react';
import './Home.scss';
import NavBar from '../../components/navBar/NavBar';
import NavbarG from '../../components/navBar/NavbarG';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import MovieItem from '../../components/MovieItem/MovieItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SkeletonListItem from '../../components/skeleton/SkeletonListItem';
import SkeletonSearch from '../../components/skeleton/SkeletonSearch';

const Home = ({ type }) => {

    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        document.title = "Netflix Việt Nam - Xem chương trình truyền hình trực tuyến, Xem phim trực tuyến"
    }, []);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
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
            setLoading(false);
        }, 2000)
        return () => clearTimeout(timer);
    }, [type, genre]);

    const search = async (searchValue) => {
        try {
            const res = await axios.get(`/movies/search?value=${searchValue}`, {
                headers: {
                    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDJiOTgzNzg3Y2M5MGRmMDlmM2FhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjU0Mzg3OSwiZXhwIjoxOTAxNzQzODc5fQ.2Urif1oO5B4Kc_jnhmgmbuZVjpjcArhaQEpEF4dTYIA"
                }
            });
            setMovies(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="home">
            { user ? (
                <NavBar search={search} />
            ) : (
                <NavbarG search={search} />
            ) }
            { movies.length === 0 ? (
                <>
                    <Featured type={type} setGenre={setGenre} />
                    { loading && <SkeletonListItem /> }
                    { !loading &&
                        <>
                            { lists.map((item) => (
                                <List key={item._id} list={item} />
                            )) }
                        </>
                    }
                </>
            ) : (
                <div className="movieSearch">
                    { movies.map((item, i) => (
                        <MovieItem key={item._id} index={i} movie={item} />
                    )) }
                </div>
            ) }
            <div className="footer">
                <div className="footertop">
                    <h4>You have questions? Contact us.</h4>
                </div>
                <div className="footer-links">
                    <ul className="list-1">
                        <li><a href="https://help.netflix.com/vi/node/412">Frequently asked questions</a></li>
                        <li><a href="https://ir.netflix.net/ir-overview/profile/default.aspx">Investor Relation</a></li>
                        <li><a href="https://help.netflix.com/legal/privacy">Privacy</a></li>
                        <li><a href="https://fast.com/">Speed test</a></li>
                    </ul>
                    <ul className="list-1">
                        <li><a href="https://help.netflix.com/vi/">Help Center</a></li>
                        <li><a href="https://jobs.netflix.com/">Jobs</a></li>
                        <li><a href="#">Cookie options</a></li>
                        <li><a href="https://help.netflix.com/legal/notices">policy notification</a></li>
                    </ul>
                    <ul className="list-1">
                        <li><a href="/login">Account</a></li>
                        <li><a href="https://devices.netflix.com/fr/">Ways to Watch</a></li>
                        <li><a href="https://help.netflix.com/legal/corpinfo">Business information</a></li>
                        <li><a href="https://www.netflix.com/vn-en/browse/genre/839338">Only available on Netflix</a></li>
                    </ul>
                    <ul className="list-1">
                        <li><a href="https://www.netflix.com/vn-en/browse/genre/839338">Multimedia Center</a></li>
                        <li><a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a></li>
                        <li><a href="https://help.netflix.com/vi/contactus">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <h4>Netflix Việt Nam</h4>
                </div>
            </div>
        </div>
    )
}

export default Home
