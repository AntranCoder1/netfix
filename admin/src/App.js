import React from 'react';
import './app.css';
import SideBar from './components/sideBar/SideBar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import UserEdit from './pages/userEdit/UserEdit';
import UserCreate from './pages/userCreate/UserCreate';
import Product from './pages/product/Product';
import ProductEdit from './pages/productEdit/ProductEdit';
import NewProduct from './pages/newProduct/NewProduct';
import List from './pages/list/List';
import ListEdit from './pages/ListEdit/ListEdit';
import NewList from './pages/newList/NewList';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';

function App() {

  const admin = useSelector(state => state.admin.currentAdmin);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          { admin ? <Redirect to="/" /> : <Login /> }
        </Route>
        { admin ? (
          <>
            <Topbar />
            <div className="container">
              <SideBar />
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/users" component={UserList} />
                <Route exact path="/users/:userId" component={UserEdit} />
                <Route exact path="/create" component={UserCreate} />
                <Route exact path="/products" component={Product} />
                <Route exact path="/products/:productId" component={ProductEdit} />
                <Route exact path="/newproduct" component={NewProduct} />
                <Route exact path="/lists" component={List} />
                <Route exact path="/lists/:listId" component={ListEdit} />
                <Route exact path="/newlist" component={NewList} />
              </Switch>
            </div>
          </>
        ) : <Login /> }
      </Switch>
    </Router>
  );
}

export default App;
