import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../../contexts/UserContextProvider';

class UpdUser extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      surname: "",
      email: "",
      newpassword: "",
      // user: { }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  componentDidMount() {
    this.updateUserInfo();
  }

  updateUserInfo(){
    if(!this.context.user) {
      return;
    }

    const id = this.context.user.id;

    const url = `/api/v1/users/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState(
        { 
          // user: response,
          id: response.id,
          name: response.name,
          surname: response.surname,
          email: response.email,
        }))
      .catch(() => this.props.history.push("/"));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { id, name, surname, email, newpassword } = this.state;
    const url = "/api/v1/users/" + id;

    const body = {
      name,
      surname,
      email,
      password: newpassword,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PATCH",
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
        this.context.setUser(response);
        this.props.history.push(`/`);
      })
      .catch(error => console.log(error.message));
  }
  
  render() {
    if(!this.state.id && this.context.user) {
      this.updateUserInfo();
    }
    return (
      // <UserContext.Consumer>
      //   { value =>
          <div className="container mt-5">
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                  Update user
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
                      value={this.state.name} 
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
                      value={this.state.surname} 
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      required
                      value={this.state.email} 
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newpassword">New password</label>
                    <input
                      type="password"
                      name="newpassword"
                      id="newpassword"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <button type="submit" className="btn custom-button mt-3">
                    Update User
                  </button>
                </form>
              </div>
            </div>
          </div>
      //   }
      // </UserContext.Consumer>
    );
  }
}

export default UpdUser;