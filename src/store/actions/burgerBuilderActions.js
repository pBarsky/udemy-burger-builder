import axios from "../../axios-orders";
import * as actionTypes from "./actionTypes";

export const addIngridient = (ingridientName) => ({
  type: actionTypes.ADD_INGRIDIENT,
  payload: { ingridientName: ingridientName },
});

export const removeIngridient = (ingridientName) => ({
  type: actionTypes.REMOVE_INGRIDIENT,
  payload: { ingridientName: ingridientName },
});

export const setIngridients = (ingridients) => ({
  type: actionTypes.SET_INGRIDIENTS,
  payload: { ingridients: ingridients },
});

export const fetchIngridientsFailed = () => ({
  type: actionTypes.FETCH_INGRIDIENTS_FAIL,
});

export const initIngridients = () => {
  return (dispatch) => {
    axios
      .get("/ingridients.json")
      .then((response) => dispatch(setIngridients(response.data)))
      .catch((error) => dispatch(fetchIngridientsFailed()));
  };
};
