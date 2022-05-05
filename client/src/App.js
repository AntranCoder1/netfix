import React, { useState } from 'react';
import './App.scss';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import MovieCart from './pages/movieCart/MovieCart';
import NewVideo from './pages/newVideo/NewVideo';
import Trending from './pages/trending/Trending';
import WatchG from './pages/watch/WatchG';
import TrendingG from './pages/trending/TrendingG';
import NewVideoG from './pages/newVideo/NewVideoG';
import MovieCartG from './pages/movieCart/MovieCartG';
import EditProfile from './pages/EditProfile/EditProfile';
import ProfileG from './pages/profile/ProfileG';
import EditProfileG from './pages/EditProfile/EditProfileG';
import Info from './pages/infoMovie/Info';
import InfoG from './pages/infoMovie/InfoG';
import MovieItem from './components/MovieItem/MovieItem';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './i18n/config';

function App() {

  const user = useSelector(state => state.user.currentUser);
  const [googleAccount, setGoogleAccount] = useState(null);
  const history = useHistory();
  
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "/auth/googlelogin",
      data: { tokenId: response.tokenId },
    }).then(response =>  {
      console.log("Google login success", response);
      setGoogleAccount(localStorage.setItem("userGoogle", JSON.stringify(response.data)));
    })
  }
  const userGoogle = localStorage.getItem("userGoogle");
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { userGoogle || user ? <Home /> : <Redirect to="/register" /> }
        </Route>
        <Route exact path="/register">
          { userGoogle || user ? <Redirect to="/" /> : <Register /> }
        </Route>
        <Route exact path="/login">
          { userGoogle || user ? <Redirect to="/" /> : <Login responseSuccessGoogle={responseSuccessGoogle} /> }
        </Route>
        {
          userGoogle ? (
            <>
              <Route exact path='/movies'>
                <Home type='movies' />
              </Route>
              <Route exact path='/series'>
                <Home type='series' />
              </Route>
              <Route path='/watch'>
                <WatchG />
              </Route>
              <Route path='/profile'>
                <ProfileG user={userGoogle} />
              </Route>
              <Route path='/movieCart'>
                <MovieCartG />
              </Route>
              <Route path='/newVideo'>
                <NewVideoG />
              </Route>
              <Route path='/trending'>
                <TrendingG />
              </Route>
              <Route path="/edit-profile">
                <EditProfileG />
              </Route>
              <Route path="/info">
                <InfoG />
              </Route>
            </>
          ) : (
            <>
              <Route exact path='/movies'>
                <Home type='movies' />
              </Route>
              <Route exact path='/series'>
                <Home type='series' />
              </Route>
              <Route path='/watch'>
                <Watch />
              </Route>
              <Route path='/profile'>
                <Profile user={user} />
              </Route>
              <Route path='/movieCart'>
                <MovieCart />
              </Route>
              <Route path='/newVideo'>
                <NewVideo />
              </Route>
              <Route path='/trending'>
                <Trending />
              </Route>
              <Route path="/edit-profile">
                <EditProfile />
              </Route>
              <Route path="/info">
                <Info />
              </Route>
            </>
          )
        }
      </Switch>
    </Router>
  );
}

export default App;
