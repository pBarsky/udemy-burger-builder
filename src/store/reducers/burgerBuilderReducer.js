import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingridients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INgriDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngridient = (state, { ingridientName }) => {
  const updatedIngridient = {
    [ingridientName]: state.ingridients[ingridientName] + 1,
  };
  const updatedIngridients = updateObject(state.ingridients, updatedIngridient);
  const updatedState = {
    ingridients: updatedIngridients,
    totalPrice: state.totalPrice + INgriDIENT_PRICES[ingridientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngridient = (state, { ingridientName }) => {
  const updatedIng = {
    [ingridientName]: state.ingridients[ingridientName] - 1,
  };
  const updatedIngs = updateObject(state.ingridients, updatedIng);
  const updatedSt = {
    ingridients: updatedIngs,
    totalPrice: state.totalPrice - INgriDIENT_PRICES[ingridientName],
    building: true,
  };
  return updateObject(state, updatedSt);
};

const setIngridients = (state, { ingridients }) => {
  return updateObject(state, {
    ingridients: {
      salad: ingridients.salad,
      bacon: ingridients.bacon,
      cheese: ingridients.cheese,
      meat: ingridients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngridientsFailed = (state, payload) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_INGRIDIENT:
      return addIngridient(state, payload);
    case actionTypes.REMOVE_INGRIDIENT:
      return removeIngridient(state, payload);
    case actionTypes.SET_INGRIDIENTS:
      return setIngridients(state, payload);
    case actionTypes.FETCH_INGRIDIENTS_FAIL:
      return fetchIngridientsFailed(state, payload);
    default:
      return state;
  }
};

export default reducer;
