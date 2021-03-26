import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Product/Products";
import Product from "../components/Product/Product";
import NewProduct from "../components/Product/NewProduct";
import Login from "../components/Account/Login";
import Register from "../components/Account/Register";
import Users from "../components/User/Users";
import User from "../components/User/User";
import NewUser from "../components/User/NewUser";
import NavBar from "../components/NavBar";
import Cart from "../components/Cart/Cart";
import Orders from "../components/Order/Orders";
import Order from "../components/Order/Order";

export default (
  <Router>
    <NavBar/>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products" exact component={Products} />
      <Route path="/product/:id" exact component={Product} />
      <Route path="/product" exact component={NewProduct} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/users" exact component={Users} />
      <Route path="/user/:id" exact component={User} />
      <Route path="/user" exact component={NewUser} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/orders" exact component={Orders} />
      <Route path="/order/:id" exact component={Order} />
    </Switch>
  </Router>
);