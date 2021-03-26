import React from "react";
import { Link } from "react-router-dom";
import OrderProductsItem from "./OrderProductsItem";
import { formatNumber, formatDateTime } from '../../helpers/utils';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/orders/index";
    fetch(url)
      .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ orders: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { orders } = this.state;
    const allOrders = orders.map((order, index) => (
      <tr key={index}>
        <th scope="row">{order.id}</th>
        <td>{formatNumber(order.amount)}</td>
        <td>{formatDateTime(Date.parse(order.created_at))}</td>
        <td>{order.user && order.user.name} {order.user && order.user.surname}</td>
        <td><OrderProductsItem key={index} order_products={order.order_products} products={order.products}/></td>
        <td className="text-right">
          <Link to={`/order/${order.id}`} className="btn custom-button">
            View Order
          </Link>
        </td>
      </tr>
    ));

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Orders</h1>
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
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Created at</th>
                  <th scope="col">User</th>
                  <th scope="col">Products</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {allOrders}
              </tbody>
            </table>
          </div>
        </main>
        </div>
      </>
    );
  }
}
export default Orders;
