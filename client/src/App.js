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
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function App() {

  const user = useSelector(state => state.user.currentUser);
  const [googleAccount, setGoogleAccount] = useState("");

  const getAccount = (response) => {
    axios({
        method: "POST",
        url: "/auth/googlelogin",
        data: { tokenId: response.tokenId }
    }).then(response =>  {
        console.log("Google login success", response);
        setGoogleAccount(response)
    })
  }

  console.log(googleAccount.data)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user || googleAccount ? <Home /> : <Redirect to="/register" /> }
        </Route>
        <Route exact path="/register">
          { user || googleAccount ? <Redirect to="/" /> : <Register /> }
        </Route>
        <Route exact path="/login">
          { user || googleAccount ? <Redirect to="/" /> : <Login responseSuccessGoogle={getAccount} /> }
        </Route>
        {
          user || googleAccount && (
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
