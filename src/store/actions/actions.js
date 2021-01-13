import { fetchOrders, purchaseBurger, purchaseInit } from "./orderActions";
import {
  addIngridient,
  removeIngridient,
  initIngridients,
} from "./burgerBuilderActions";
import {
  auth,
  authCheckState,
  logout,
  setAuthRedirectPath,
} from "./authActions";

const orderActions = {
  fetchOrders: fetchOrders,
  purchaseBurger: purchaseBurger,
  purchaseInit: purchaseInit,
};

const burgerBuilderActions = {
  addIngridient: addIngridient,
  removeIngridient: removeIngridient,
  initIngridients: initIngridients,
};

const authActions = {
  auth: auth,
  logout: logout,
  setAuthRedirectPath: setAuthRedirectPath,
  authCheckState: authCheckState,
};

export { orderActions, burgerBuilderActions, authActions };
