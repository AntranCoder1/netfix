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

function App() {

  const [users, setUsers] = useState(null);

  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:5000/api/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(response => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!")
      }).then(resObject => {
        setUsers(resObject.users)
      }).catch(err => {
        console.log(err)
      });
    }
    getUser();
  }, []);

  console.log(users)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user || users ? <Home /> : <Redirect to="/register" /> }
        </Route>
        <Route exact path="/register">
          { user ? <Redirect to="/" /> : <Register /> }
        </Route>
        <Route exact path="/login">
          { user || users ? <Redirect to="/" /> : <Login /> }
        </Route>
        {
          user && (
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
