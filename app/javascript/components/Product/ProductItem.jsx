import React, {useContext} from "react";
import { Link } from "react-router-dom";
import ProductItemAddToCardBtn from './ProductItemAddToCardBtn';
import { formatNumber } from '../../helpers/utils';
import { UserContext } from '../../contexts/UserContextProvider';

const ProductItem = ({product}) => {
  const {isAuthorized, isUserAdmin} = useContext(UserContext);

  return ( 
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4">
      <img
        src={product.image}
        className="card-img-top"
        alt={`${product.name} image`}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{product.name}</h5>
        <h5 className="card-title text-center">{formatNumber(product.price)}</h5>
        <div className="row">
          <div className="col-6">
            <Link to={`/product/${product.id}`} className="btn custom-button btn-block">
              View Product
            </Link>
          </div>
          {
            isAuthorized() &&
            <div className="col-6">
              <ProductItemAddToCardBtn product={product}/>
            </div>
          }
        </div>
      </div>
      </div>
    </div>
   );
}

export default ProductItem;