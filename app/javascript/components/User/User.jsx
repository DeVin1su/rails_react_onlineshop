import React from "react";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { role: [] } };

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/users/${id}`;
    // const url = `/api/v1/users/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ user: response }))
      .catch(() => this.props.history.push("/users"));
  }

  deleteUser() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/users/${id}`;
    // const url = `/api/v1/users/destroy/${id}`;
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
      .then(() => this.props.history.push("/users"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {user.name} {user.surname}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <h5 className="mb-2">Name: <span className="text-info">{user.name}</span></h5>
              <h5 className="mb-2">Surname: <span className="text-info">{user.surname}</span></h5>
            </div>
            <div className="col-sm-12 col-lg-3">
              <h5 className="mb-2">Login: <span className="text-info">{user.login}</span></h5>
            </div>
            <div className="col-sm-12 col-lg-3">
              <h5 className="mb-2">Role: <span className="text-info">{user.role ? user.role.name : ""}</span></h5>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteUser}>
                Delete User
              </button>
            </div>
          </div>
          <Link to="/users" className="btn btn-link">
            Back to users
          </Link>
        </div>
      </div>
    );
  }
}

export default User;