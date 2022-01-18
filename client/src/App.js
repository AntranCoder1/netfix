import React, { useState, useEffect } from 'react';
import './App.scss';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function App() {

  const user = useSelector(state => state.user.currentUser);
  const [googleAccount, setGoogleAccount] = useState(null);
  
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "/auth/googlelogin",
      data: { tokenId: response.tokenId }
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
                <Watch />
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
            </>
          )
        }
      </Switch>
    </Router>
  );
}

export default App;
