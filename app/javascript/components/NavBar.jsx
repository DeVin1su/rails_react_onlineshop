import React, { useContext } from "react";
import { NavBarUser } from './NavBarUser';
import { Link } from "react-router-dom";
import { CartIcon } from './icons/index';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContextProvider';

function NavBar(props) {
  const {isAuthorized, isUserAdmin} = useContext(UserContext);
  const {itemCount} = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <div className="d-flex">
          <Link to="/products" className="nav-item nav-link">Products</Link>
          {
            isUserAdmin() &&
            <Link to="/users" className="nav-item nav-link">Users</Link>
          }
          {
            isUserAdmin() &&
            <Link to="/orders" className="nav-item nav-link">Orders</Link>
          }
        </div>
        <div className="d-flex">
          {
            isAuthorized() &&
            <Link to='/cart' className="nav-item nav-link"> <CartIcon /> Cart ({itemCount})</Link>
          }
          <NavBarUser />
        </div>
      </div>
      {/* <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" href="#">Features</a>
          <a class="nav-item nav-link" href="#">Pricing</a>
          <a class="nav-item nav-link disabled" href="#">Disabled</a>
        </div>
      </div> */}
    </nav>
  )
}

export default NavBar;