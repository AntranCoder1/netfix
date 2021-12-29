import React from 'react';
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

function App() {

  const user = true;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user ? <Home /> : <Redirect to="/register" /> }
        </Route>
        <Route exact path="/register">
          { user ? <Redirect to="/" /> : <Register /> }
        </Route>
        <Route exact path="/login">
          { user ? <Redirect to="/" /> : <Login /> }
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
