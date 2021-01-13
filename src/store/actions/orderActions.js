import axios from "../../axios-orders";
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: { id: id, orderData: orderData },
});

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  payload: { error: error },
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData, token) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post(`/orders.json?auth=${token}`, orderData)
    .then((res) => {
      dispatch(purchaseBurgerSuccess(res.data, orderData));
    })
    .catch((error) => {
      purchaseBurgerFail(error);
    });
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: { orders: orders },
});

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: { error: error },
  };
};

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(`/orders.json?${queryParams}`)
      .then((res) => {
        const orders = Object.keys(res.data).map((key) => {
          return { ...res.data[key], id: key };
        });
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((err) => dispatch(fetchOrdersFail(err)));
  };
};
