import { fetchOrders, purchaseBurger, purchaseInit } from "./orderActions";
import {
  addIngridient,
  removeIngridient,
  initIngridients,
} from "./burgerBuilderActions";

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

export { orderActions, burgerBuilderActions };
