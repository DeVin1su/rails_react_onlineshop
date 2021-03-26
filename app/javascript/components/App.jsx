import React from "react";
import Routes from "../routes/Index";
// import {UserContext} from "../contexts/UserContext";
import UserContextProvider, {UserContext} from "../contexts/UserContextProvider";
import ProductsContextProvider from '../contexts/ProductsContext';
import CartContextProvider from '../contexts/CartContext';

// export default props => <>{Routes}</>;
export default class App extends React.Component {
  // static contextType = UserContext;
  
  constructor(props) {
    super(props);
    
    // this.setUser = this.setUser.bind(this);
    // this.setUser = (user) => {
    //   // let isAuthorized = false;
    //   // if(user){
    //   //   isAuthorized = true;
    //   // }
    //   this.setState(state => ({
    //     user: user,
    //     // isAuthorized
    //   }));
    // };

    // Состояние хранит функцию для обновления контекста,
    // которая будет также передана в Provider-компонент.
    this.state = {
      // isAuthorized: false,
      // user: { 
      //   user: null,
      //   setUser: this.setUser,
      //   isAuthorized: () => user ? true : false,
      //   isUserAdmin: () => user && user.role_id == AdminRoleId
      // },
      products: []
    }
  }

  // componentDidMount(){
  //   const url = "/api/v1/login";
  //   fetch(url)
  //     .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     throw new Error("Network response was not ok.");
  //     })
  //     .then(response => {
  //       this.context.setUser({user: response})
  //     })
  //     .catch(() => this.props.history.push("/"));
  // }

  // setUser(user) {
  //   this.setState(state => ({
  //     user: user,
  //   }));
  // };

  render() {
    const { products } = this.state;

    return (
      // <UserContext.Provider value={user}>
      <UserContextProvider>
        <ProductsContextProvider products={products}>
          <CartContextProvider>
            {Routes}
          </CartContextProvider>
        </ProductsContextProvider>
      </UserContextProvider>
      // </UserContext.Provider>
      // <>
      // {Routes}
      // </>
    );
  }
}