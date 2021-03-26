import React from "react";
import { Link } from "react-router-dom";

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      image: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/products/create";
    const { name, description, price, image } = this.state;

    if (name.length == 0 || description.length == 0 || price.length == 0)
      return;

    const body = {
      name,
      description: description.replace(/\n/g, "<br> <br>"),
      price,
    };

    if(image && image.length > 0){
      body.image = image;
    }

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
      .then(response => this.props.history.push(`/product/${response.id}`))
      .catch(error => console.log(error.message));
  }
  
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new product to our awesome product catalog.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="productName">Product name</label>
                <input
                  type="text"
                  name="name"
                  id="productName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <label htmlFor="productDescription">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="productDescription"
                rows="5"
                required
                onChange={this.onChange}
              />
              <div className="form-group">
                <label htmlFor="productName">Image url</label>
                <input
                  type="text"
                  name="image"
                  id="productImage"
                  className="form-control"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  name="price"
                  id="productPrice"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Product
              </button>
              <Link to="/products" className="btn btn-link mt-3">
                Back to products
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProduct;