import React from "react";
import { Link } from "react-router-dom";
// import { UserContext } from "../../contexts/UserContext";
import { UserContext } from "../../contexts/UserContextProvider";

class Login extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.context.setUser(user);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/login";
    const { login, password } = this.state;

    if (login.length == 0 || password.length == 0)
      return;

    const body = {
      login,
      password
    };

    // if(body.login == "admin" && body.password == "admin")
    //   this.setUser({name: "Denys"});

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        this.setUser(response);
        this.props.history.push(`/`);
      })
      .catch(error => console.log(error.message));
  }
  
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Login
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Login
              </button>
              <Link to="/products" className="btn btn-link mt-3">
                Home
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;