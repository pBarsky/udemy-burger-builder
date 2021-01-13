import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, { orderData, orderId }) => {
  const newOrder = updateObject(orderData, { id: orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, { orders }) => {
  return updateObject(state, {
    orders: orders,
    loading: false,
  });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, payload);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, payload);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, payload);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, payload);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, payload);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, payload);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
