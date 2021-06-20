import axios from "axios";

import {
    SET_DISCOUT_PRODUCTS
  } from "./actionsNames";

export function getDiscountProducts() {
    return (dispatch) => {
      axios
        .get(`http://localhost:4000/`)
        .then((response) => {
          
          dispatch({ type: SET_DISCOUT_PRODUCTS, payload: response.data });
        });
    };
  }