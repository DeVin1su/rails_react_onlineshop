import React from "react";

function OrderProductsNameWithQuantity(order_products, products) {

  const FindProductName = (productId) => {
    const product = products.find(item => item.id === productId);
    return product ? product.name : "";
  }

  const allOrder_products = order_products.map((order_product, index) => (
    <span key={order_product.product_id}>
      {FindProductName(order_product.product_id)} ({order_product.quantity})
    </span>
  ));

  return allOrder_products;
}

export default OrderProductsNameWithQuantity;