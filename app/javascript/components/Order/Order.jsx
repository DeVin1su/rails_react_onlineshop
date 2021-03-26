import React from "react";
import { Link } from "react-router-dom";
import OrderProductsNameWithQuantity from "./OrderProductsNameWithQuantity";
import { formatDateTime } from '../../helpers/utils';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: { order_products: [], products: [] } };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/orders/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ order: response }))
      .catch(() => this.props.history.push("/orders"));
  }

  render() {
    const { order } = this.state;
    let productList = "No products available";

    const allOrder_products = OrderProductsNameWithQuantity(order.order_products, order.products);

    if (allOrder_products.length > 0) {
      productList = allOrder_products
        // .split(",")
        .map((product, index) => (
          <li key={index} className="list-group-item">
            {product}
          </li>
        ));
    }
    
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {order.name}
          </h1>
        </div>
        <div className="container">
          <Link to="/orders" className="btn btn-link py-3">
            Back to orders
          </Link>
          <div className="row">
            <div className="col-sm-12 col-lg-9">
              <h5 className="mb-2">Number: {order.id}</h5>
              <h5 className="mb-2">User: {order.user && order.user.name} {order.user && order.user.surname}</h5>
              <h5 className="mb-2">Created at: {order.created_at ? formatDateTime(Date.parse(order.created_at)) : ""}</h5>
            </div>
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Products</h5>
                {productList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Order;