import React from "react";
import { Link } from "react-router-dom";

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      role_id: "",
      roles: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const url = "/api/v1/roles/index";
    fetch(url)
      .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
      })
      .then(response => {
        let role_id = "";
        if(response && response.length) {
          role_id = response[0].id;
        }
        this.setState({ roles: response, role_id: role_id });
      })
      .catch(() => this.props.history.push("/"));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/users";
    // const url = "/api/v1/users/create";
    const { name, surname, email, password, role_id } = this.state;

    if (name.length == 0 || surname.length == 0 || email.length == 0 || password.length == 0 || role_id.length == 0)
      return;

    const body = {
      name,
      surname,
      email,
      password,
      role_id
    };

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
      .then(response => this.props.history.push(`/user/${response.id}`))
      .catch(error => console.log(error.message));
  }
  
  render() {
    const { roles } = this.state;
    const allRoles = roles.map((role, index) => (
      <option key={role.id} value={role.id}>{role.name}</option>
    ))

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new user
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
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
              <div className="form-group">
                <label htmlFor="role_id">Role</label>
                <select id="role_id" name="role_id" className="form-control" onChange={this.onChange}>
                  {allRoles}
                </select>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create User
              </button>
              <Link to="/users" className="btn btn-link mt-3">
                Back to users
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;