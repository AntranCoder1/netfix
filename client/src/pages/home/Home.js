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
import LanguageIcon from '@material-ui/icons/Language';
import { Trans, useTranslation } from 'react-i18next';

const filterMovies = (movies, query) => {
    if (!query) {
      return movies;
    }
  
    return movies.filter((movie) => {
      const movieName =  movie.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      return movieName;
    });
};

const Home = ({ type }) => {

    const movies = useSelector(state => state.movie.movies);
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.currentUser);

    const { search } = window.location;
    const query = new URLSearchParams(search).get("search");
    const [searchQuery, setSearchQuery] = useState(query || "");
    const filteredMovie = filterMovies(movies, searchQuery);

    const { t } = useTranslation();
    const { i18n } = useTranslation();

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

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <div className="home">
            { user ? (
                <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            ) : (
                <NavbarG searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            ) }
            { !searchQuery ? (
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
                    { filteredMovie.map((item, i) => (
                        <MovieItem key={item._id} index={i} movie={item} />
                    )) }
                </div>
            ) }
            {/* <div className="footer">
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
                <div className="trans">
                    <LanguageIcon className="trans-icon" />
                    <select onClick={changeLanguage}>
                        <option value="en">English</option>
                        <option value="vn">Tiếng Việt</option>
                    </select>
                </div>
                <div className="footer-bottom">
                    <h4>Netflix Việt Nam</h4>
                </div>
            </div> */}
            <div className="footer">
                <div className="footer-title">
                    <Trans t={t}>footer-title</Trans>
                </div>
                <p className="footer-break"></p>
                <div className="footer-row">
                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/node/412" className="footer-link">
                            <Trans t={t}>footer-column1-link-1</Trans>
                        </a>
                        <a href="https://ir.netflix.net/ir-overview/profile/default.aspx" className="footer-link">
                            <Trans t={t}>footer-column1-link-2</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/privacy" className="footer-link">
                            <Trans t={t}>footer-column1-link-3</Trans>
                        </a>
                        <a href="https://fast.com/" className="footer-link">
                            <Trans t={t}>footer-column1-link-4</Trans>
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="https://help.netflix.com/vi/" className="footer-link">
                            <Trans t={t}>footer-column2-link-1</Trans>
                        </a>
                        <a href="https://jobs.netflix.com/" className="footer-link">
                            <Trans t={t}>footer-column2-link-2</Trans>
                        </a>
                        <a href="#" className="footer-link">
                            <Trans t={t}>footer-column2-link-3</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/notices" className="footer-link">
                            <Trans t={t}>footer-column2-link-4</Trans>
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="/login" className="footer-link">
                            <Trans t={t}>footer-column3-link-1</Trans>
                        </a>
                        <a href="https://devices.netflix.com/fr/" className="footer-link">
                            <Trans t={t}>footer-column3-link-2</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/corpinfo" className="footer-link">
                            <Trans t={t}>footer-column3-link-3</Trans>
                        </a>
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">
                            <Trans t={t}>footer-column3-link-4</Trans>
                        </a>
                    </div>

                    <div className="footer-column">
                        <a href="https://www.netflix.com/vn-en/browse/genre/839338" className="footer-link">
                            <Trans t={t}>footer-column4-link-1</Trans>
                        </a>
                        <a href="https://help.netflix.com/legal/termsofuse" className="footer-link">
                            <Trans t={t}>footer-column4-link-2</Trans>
                        </a>
                        <a href="https://help.netflix.com/vi/contactus" className="footer-link">
                            <Trans t={t}>footer-column4-link-3</Trans>
                        </a>
                    </div>
                </div>
                <div className="trans">
                    <LanguageIcon className="trans-icon" />
                    <select onClick={changeLanguage}>
                        <option value="en">English</option>
                        <option value="vn">Tiếng Việt</option>
                    </select>
                </div>
                <p className="footer-break"></p>        
                <p className="footer-text">Netflix Vietnam</p>
            </div>
        </div>
    )
}

export default Home
