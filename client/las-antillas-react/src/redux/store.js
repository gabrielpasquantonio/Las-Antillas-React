import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  SET_DISCOUT_PRODUCTS,
  SET_ALL_PRODUCTS,
  SET_HABANOS,
  SET_CIGARROS,
  SET_CIGARRITOS,
  SET_PIPAS,
  SET_ARMAR,
  SET_PRODUCT_ID,
  ORDER_PRODUCT
} from "./actionsNames";

const initialState = {
  discountProducts: undefined,
  allProducts: undefined,
  habanos: undefined,
  cigarros: undefined,
  cigarritos: undefined,
  pipas: undefined,
  armar: undefined,
  productId: undefined,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DISCOUT_PRODUCTS: {
      return { ...state, discountProducts: action.payload };
    }

    case SET_ALL_PRODUCTS: {
      return { ...state, allProducts: action.payload };
    }
    case SET_HABANOS: {
      return { ...state, habanos: action.payload };
    }
    case SET_CIGARROS: {
      return { ...state, cigarros: action.payload };
    }
    case SET_CIGARRITOS: {
      return { ...state, cigarritos: action.payload };
    }
    case SET_PIPAS: {
      return { ...state, pipas: action.payload };
    }
    case SET_ARMAR: {
      return { ...state, armar: action.payload };
    }
    case SET_PRODUCT_ID: {
      return { ...state, productId: action.payload };
    }
    case ORDER_PRODUCT: {
      return { ...state, allProducts: action.payload };
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
