import React from "react";
import { Link } from "react-router-dom";
import ProductItemAddToCardBtn from "./ProductItemAddToCardBtn";
import { UserContext } from '../../contexts/UserContextProvider';
import { formatNumber } from '../../helpers/utils';

class Product extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = { product: {} };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/products/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ product: response }))
      .catch(() => this.props.history.push("/products"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteProduct() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/products/destroy/${id}`;
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
      .then(() => this.props.history.push("/products"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { product } = this.state;

    const productDescription = this.addHtmlEntities(product.description);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={product.image}
            alt={`${product.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {product.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${productDescription}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-3">
              <h5 className="mb-2">Price: {formatNumber(product.price)}</h5>
            </div>
            <div className="col-sm-12 col-lg-2">
              {
                this.context.isAuthorized() &&
                <ProductItemAddToCardBtn product={product}/>
              }
              {
                this.context.isUserAdmin() &&
                <button type="button" className="btn btn-danger btn-block" onClick={this.deleteProduct}>
                  Delete Product
                </button>
              }
            </div>
          </div>
          <Link to="/products" className="btn btn-link">
            Back to products
          </Link>
        </div>
      </div>
    );
  }
}

export default Product;