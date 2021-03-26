import React, { createContext, useState } from 'react';
export const ProductsContext = createContext()

const ProductsContextProvider = ({children, products}) => {

    // const [products] = useState(products);

    return ( 
        <ProductsContext.Provider value={{products}} >
            { children }
        </ProductsContext.Provider>
     );
}
 
export default ProductsContextProvider;