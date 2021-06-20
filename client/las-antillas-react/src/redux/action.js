import axios from "axios";

import {
    SET_DISCOUT_PRODUCTS,
    SET_ALL_PRODUCTS,
    SET_HABANOS,
    SET_CIGARROS,
    SET_CIGARRITOS,
    SET_PIPAS,
    SET_ARMAR
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

  
export function getAllProducts() {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/allProducts`)
      .then((response) => {
        
        dispatch({ type: SET_ALL_PRODUCTS, payload: response.data });
      });
  };
}

export function getHabanos() {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/habanos`)
      .then((response) => {
        
        dispatch({ type: SET_HABANOS, payload: response.data });
      });
  };
}
export function getCigarros() {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/cigarros`)
      .then((response) => {
        
        dispatch({ type: SET_CIGARROS, payload: response.data });
      });
  };
}
export function getCigarritos() {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/cigarritos`)
      .then((response) => {
        
        dispatch({ type: SET_CIGARRITOS, payload: response.data });
      });
  };
}
export function getPipas() {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/tabacosPipas`)
      .then((response) => {
        
        dispatch({ type: SET_PIPAS, payload: response.data });
      });
  };
}
export function getArmar() {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/tabacosArmar`)
      .then((response) => {
        
        dispatch({ type: SET_ARMAR, payload: response.data });
      });
  };
}