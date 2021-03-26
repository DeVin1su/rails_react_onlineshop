
import React from "react";
import {AdminRoleId} from "../helpers/consts";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  isAuthorized: () => user ? true : false,
  isUserAdmin: () => user && user.role_id == AdminRoleId
});
