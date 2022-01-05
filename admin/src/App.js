import React from 'react';
import './app.css';
import SideBar from './components/sideBar/SideBar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import UserEdit from './pages/userEdit/UserEdit';
import UserCreate from './pages/userCreate/UserCreate';
import Product from './pages/product/Product';
import ProductEdit from './pages/productEdit/ProductEdit';
import NewProduct from './pages/newProduct/NewProduct';
import List from './pages/list/List';
import ListList from './pages/listlist/ListList';
import NewList from './pages/newList/NewList';

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <SideBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:userId" component={UserEdit} />
          <Route exact path="/create" component={UserCreate} />
          <Route exact path="/products" component={Product} />
          <Route exact path="/products/:productId" component={ProductEdit} />
          <Route exact path="/newproduct" component={NewProduct} />
          <Route exact path="/lists" component={ListList} />
          <Route exact path="/lists/:listId" component={List} />
          <Route exact path="/newlist" component={NewList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
