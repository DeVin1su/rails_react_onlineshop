import React, { useContext } from "react";
import { CartContext } from '../../contexts/CartContext';

const ProductItemAddToCardBtn = ({product}) => {

  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = product => {
      return !!cartItems.find(item => item.id === product.id);
  }

  return ( 
    <>
      {
          isInCart(product) && 
          <button 
          onClick={() => increase(product)}
          className="btn btn-outline-primary btn-block">Add more</button>
      }

      {
          !isInCart(product) && 
          <button 
          onClick={() => addProduct(product)}
          className="btn btn-primary btn-block">Add to cart</button>
      }
    </>
   );
}

export default ProductItemAddToCardBtn;