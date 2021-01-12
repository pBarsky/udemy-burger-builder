import * as actionTypes from "../actions";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

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
          [payload.ingridientName]:
            state.ingridients[payload.ingridientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGRIDIENT_PRICES[payload.ingridientName],
      };

    case actionTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [payload.ingridientName]:
            state.ingridients[payload.ingridientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGRIDIENT_PRICES[payload.ingridientName],
      };

    default:
      return state;
  }
};

export default reducer;
