import React from "react";
import { Link } from "react-router-dom";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/users/index";
    fetch(url)
      .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ users: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { users } = this.state;
    const allUsers = users.map((user, index) => (
      <tr key={index}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.surname}</td>
        <td>{user.login}</td>
        <td className="text-right">
          <Link to={`/user/${user.id}`} className="btn custom-button">
            View User
          </Link>
        </td>
      </tr>
      // <div key={index} className="col-md-6 col-lg-4">
      //   <div className="card mb-4">
      //   <img
      //     src={user.image}
      //     className="card-img-top"
      //     alt={`${user.name} image`}
      //   />
      //   <div className="card-body">
      //     <h5 className="card-title">{user.name}</h5>
      //     <Link to={`/user/${user.id}`} className="btn custom-button">
      //     View User
      //     </Link>
      //   </div>
      //   </div>
      // </div>
    ));

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Users</h1>
        </div>
        </section>
        <div className="">
        <main className="container">
          <div className="row">
            <div className="mb-3 col-6">
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </div>
            <div className="text-right mb-3 col-6">
              <Link to="/user" className="btn custom-button">
                Create New User
              </Link>
            </div>
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Login</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {allUsers}
              </tbody>
            </table>
          </div>
        </main>
        </div>
      </>
    );
  }
}
export default Users;
