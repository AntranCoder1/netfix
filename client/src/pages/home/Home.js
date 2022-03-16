import React, { useEffect, useState } from 'react';
import './Home.scss';
import NavBar from '../../components/navBar/NavBar';
import NavbarG from '../../components/navBar/NavbarG';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import MovieItem from '../../components/MovieItem/MovieItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Home = ({ type }) => {

    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        document.title = "Netflix Việt Nam - Xem chương trình truyền hình trực tuyến, Xem phim trực tuyến"
    }, []);

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
                    { lists.map((item) => (
                        <List key={item._id} list={item} />
                    )) }
                </>
            ) : (
                <div className="movieSearch">
                    { movies.map((item, i) => (
                        <MovieItem key={item._id} index={i} movie={item} />
                    )) }
                </div>
            ) }
            <div className="footer">
                <div className="footer-title">Question? Contact us.</div>
                <p className="footer-break"></p>
                <div className="footer-row">
                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/node/412" className="footer-link">FAQ</a>
                        <a href="https://ir.netflix.net/ir-overview/profile/default.aspx" className="footer-link">Investor Relations</a>
                        <a href="https://help.netflix.com/legal/privacy" className="footer-link">Privacy</a>
                        <a href="https://fast.com/" className="footer-link">Speed test</a>
                    </div>

                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/" className="footer-link">Help Center</a>
                        <a href="https://jobs.netflix.com/" className="footer-link">Jobs</a>
                        <a href="#" className="footer-link">Cookie Preferences</a>
                        <a href="https://help.netflix.com/legal/notices" className="footer-link">Legal Notices</a>
                    </div>

                    <div className="footer-column">
                        <a href="/login" className="footer-link">Account</a>
                        <a href="https://devices.netflix.com/fr/" className="footer-link">Ways to Watch</a>
                        <a href="https://help.netflix.com/legal/corpinfo" className="footer-link">Corporate Information</a>
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">Only on Netflix</a>
                    </div>

                    <div className="footer-column">
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">Media Center</a>
                        <a href="https://help.netflix.com/legal/termsofuse" className="footer-link">Terms of Use</a>
                        <a href="https://help.netflix.com/vi/contactus" className="footer-link">Contact Us</a>
                    </div>
                </div>
                <p className="footer-break"></p>
            </div>
        </div>
    )
}

export default Home
