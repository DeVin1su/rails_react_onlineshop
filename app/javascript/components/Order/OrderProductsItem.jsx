import React from "react";
import OrderProductsNameWithQuantity from "./OrderProductsNameWithQuantity";

const OrderProductsItem = ({order_products, products}) => {

  const FindProductName = (productId) => {
    const product = products.find(item => item.id === productId);
    return product ? product.name : "";
  }

  const allOrder_products = OrderProductsNameWithQuantity(order_products, products);

  if(allOrder_products.length){
    return (allOrder_products.reduce((prev, curr) => [prev, ', ', curr]));
  }

  return "";

  // return (
  //     {
  //       allOrder_products.length > 0 &&
  //       allOrder_products.reduce((prev, curr) => [prev, ', ', curr])
  //     }
  //  );
}

export default OrderProductsItem;