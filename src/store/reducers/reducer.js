import * as actionTypes from "../actions";

const initialState = {
  ingridients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0,
  }, // {} instead of null, will add async load from web later
  totalPrice: 4,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [payload.ingridientName]: state[payload.ingridientName] + 1,
        },
      };

    case actionTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [payload.ingridientName]: state[payload.ingridientName] - 1,
        },
      };

    default:
      return state;
  }
};

export default reducer;
