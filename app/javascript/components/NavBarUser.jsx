import React from "react";
import { Link } from 'react-router-dom';
// import { UserContext } from "../contexts/UserContext";
import { UserContext } from "../contexts/UserContextProvider";
import { Redirect } from 'react-router';

export class NavBarUser extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state ={
      redirect: false
    }
    this.logout = this.logout.bind(this);
  }
  
  componentDidMount(){
    const url = "/api/v1/currentuser";
    // const url = "api/v1/users/get";
    fetch(url)
      .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
      })
      .then(response => {
        this.context.setUser(response)
      })
      .catch((e) => console.log(e));
      // .catch(() => this.props.history.push("/"));
  }

  logout(e) {
    e.preventDefault();
    
    const url = `/api/v1/logout`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      document.querySelector('meta[name="csrf-param"]').content = response.csrfParam;
      document.querySelector('meta[name="csrf-token"]').content = response.csrfToken;
      this.context.setUser(null);
      this.setState({redirect: true});
      // this.props.history.push(`/`);
    })
    .catch(error => console.log(error.message));
  }

  render() {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return <Redirect push to="/" />;
    }

    let user = this.context.user;

    if (user) {
      return <NavBarUserAuthorized user={user} logout={this.logout}/>;
    }
    return <NavBarUserGuest />;
  }
}
// export function NavBarUser(props) {
//   if (props.user) {
//     return <NavBarUserAuthorized user={props.user} />;
//   }
//   return <NavBarUserGuest />;
// }

function NavBarUserAuthorized(props) {
  return (
    <>
      <span className="navbar-text">Welcome {props.user.name} {props.user.name}!</span>
      {/* <a className="nav-item" href="#" onClick={props.setUser}>Logout</a> */}
      <Link to="/" className="nav-item nav-link" onClick={props.logout}>Logout</Link>
    </>
  );
}

function NavBarUserGuest(props) {
  return (
    <>
      <Link to="/login" className="nav-item nav-link">Sign in</Link>
      <Link to="/register" className="nav-item nav-link">Sign up</Link>
    </>
  );
}