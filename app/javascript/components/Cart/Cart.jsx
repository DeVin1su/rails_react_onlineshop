import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContextProvider';
import { formatNumber } from '../../helpers/utils';

const Cart = () => {
  const { user } = useContext(UserContext);
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);

  function Checkout(e) {
    e.preventDefault();    

    const url = "/api/v1/orders/create";

    if (total == 0)
      return;

    const body = {
      amount: total,
      user_id: user.id,
      products: cartItems.map(product => { return { id: product.id, quantity: product.quantity }})
    };


    // function ResetOrder() {
    //   if(checkout && (orderSaved || !itemCount)) {
    //     clearCart();
    //   }
    // }

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
      .then(() => handleCheckout())
      .catch(error => console.log(error.message));
  }

  // useEffect(() => {
  //   ResetOrder();

  //   return () => {
  //     ResetOrder();
  //   };
  // });
  
  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
      <div className="container py-5">
        <h1 className="display-4">Cart</h1>
      </div>
      </section>
      <div className="">
        <main className="container">
          <div className="row no-gutters justify-content-center">
            <div className="col-sm-9 p-3">
              {
                cartItems.length > 0 ?
                <CartProducts/> :
                <div className="p-3 text-center text-muted">
                  Your cart is empty
                </div>
              }

              { checkout && 
                <div className="p-3 text-center text-success">
                  <p>Checkout successfull</p>
                  <Link to="/products" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                </div>
              }
            </div>
            {
              cartItems.length > 0 && 
              <div className="col-sm-3 p-3">
                <div className="card card-body">
                  <p className="mb-1">Total Items</p>
                  <h4 className=" mb-3 txt-right">{itemCount}</h4>
                  <p className="mb-1">Total Payment</p>
                  <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                  <hr className="my-4"/>
                  <div className="text-center">
                      <button type="button" className="btn btn-primary mb-2" onClick={Checkout}>CHECKOUT</button>
                      <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                  </div>

                </div>
              </div>
            }
          </div>
        </main>
      </div>
    </>
  );
}

export default Cart;
