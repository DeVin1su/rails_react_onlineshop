
import React, { createContext, useState, useEffect } from "react";
import {AdminRoleId} from "../helpers/consts";
export const UserContext = createContext()

const UserContextProvider = ({children}) => {

  const [user, setUser] = useState(null);
  // const [user] = useState(user);

  // setUser(user) {
  //   this.setState(state => ({
  //     user: user,
  //   }));
  // };

  const value = { 
    user,
    setUser: (user) => setUser(user),
    isAuthorized: () => user ? true : false,
    isUserAdmin: () => user && user.role_id == AdminRoleId
  };

  // const url = "/api/v1/login";
  // fetch(url)
  //   .then(response => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw new Error("Network response was not ok.");
  //   })
  //   .then(response => {
  //     setUser({user: response})
  //   })
  //   .catch((e) => console.log(e));

  // useEffect(() => {
  //   const url = "/api/v1/login";
  //   fetch(url)
  //     .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     throw new Error("Network response was not ok.");
  //     })
  //     .then(response => {
  //       setUser({user: response})
  //     })
  //     .catch((e) => console.log(e));
  // });

  return ( 
      <UserContext.Provider value={value} >
          { children }
      </UserContext.Provider>
   );
}

export default UserContextProvider;