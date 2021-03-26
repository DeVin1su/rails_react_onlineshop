import React from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { UserContext } from '../../contexts/UserContextProvider';

class Products extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/products/index";
    fetch(url)
      .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ products: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { products } = this.state;

    const allProducts = products.map((product, index) => (
      <ProductItem key={index} product={product}/>
      // <div key={index} className="col-md-6 col-lg-4">
      //   <div className="card mb-4">
      //   <img
      //     src={product.image}
      //     className="card-img-top"
      //     alt={`${product.name} image`}
      //   />
      //   <div className="card-body">
      //     <h5 className="card-title">{product.name}</h5>
      //     <Link to={`/product/${product.id}`} className="btn custom-button">
      //     View Product
      //     </Link>
      //   </div>
      //   </div>
      // </div>
    ));
    const noProduct = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No products yet. Why not <Link to="/new_product">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Products for every occasion</h1>
          <p className="lead text-muted">
            OnlineShop product catalog at the best prices. Quality assurance from OnlineShop
          </p>
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
            {
              this.context.isUserAdmin() &&
              <div className="text-right mb-3 col-6">
                <Link to="/product" className="btn custom-button">
                  Create New Product
                </Link>
              </div>
            }
          </div>
          <div className="row">
            {products.length > 0 ? allProducts : noProduct}
          </div>
        </main>
        </div>
      </>
    );
  }
}
export default Products;
