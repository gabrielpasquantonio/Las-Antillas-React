import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
    SET_DISCOUT_PRODUCTS
  } from "./actionsNames";


  const initialState = {
    discountProducts: undefined,
    
  };



  function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_DISCOUT_PRODUCTS: {
        return { ...state, discountProducts: action.payload };
      }
   
    
    
        default: {
  
        return state;
      }
    }
  }
  
  const store = createStore(reducer, applyMiddleware(thunk));
  
  export default store;