import axios from "axios";

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

export function getDiscountProducts() {
    return (dispatch) => {
      axios
        .get(`http://localhost:4000/`)
        .then((response) => {
          
          dispatch({ type: SET_DISCOUT_PRODUCTS, payload: response.data });
        });
    };
  }

  export function getProduct(id,category) {
   console.log(category)
   if(category==1){
    return (dispatch) => {
      axios
        .get(`http://localhost:4000/productDetailHabano?productId=${id}`)
        .then((response) => {
          
          dispatch({ type: SET_PRODUCT_ID, payload: response.data });
        });
    }}

    if(category==2){
      return (dispatch) => {
        axios
          .get(`http://localhost:4000/productDetailCigarro?productId=${id}`)
          .then((response) => {
            
            dispatch({ type: SET_PRODUCT_ID, payload: response.data });
          });
      }}
      if(category==3){
        return (dispatch) => {
          axios
            .get(`http://localhost:4000/productDetailCigarrito?productId=${id}`)
            .then((response) => {
              
              dispatch({ type: SET_PRODUCT_ID, payload: response.data });
            });
        }}
        if(category==4){
          return (dispatch) => {
            axios
              .get(`http://localhost:4000/productDetailTabacoParaPipa?productId=${id}`)
              .then((response) => {
                
                dispatch({ type: SET_PRODUCT_ID, payload: response.data });
              });
          }}
          if(category==5){
            return (dispatch) => {
              axios
                .get(`http://localhost:4000/productDetailTabacoParaArmar?productId=${id}`)
                .then((response) => {
                  
                  dispatch({ type: SET_PRODUCT_ID, payload: response.data });
                });
            }}

  }
  export function clearUser() {
    return {
      type: SET_PRODUCT_ID,
      payload: undefined,
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


export async function order(data, option) {
  let sortedData;
  if (option.name) {
   
   
   
    sortedData = data.sort((a, b) => {
      if (option.name === "Descendent") {
        // https://developer.mozilla.org/es/search?q=sort
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
      } else {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
      }
      
      return 0;
    }); 
  }
  if (option.price) {
    const dataOrdenadaClear = data.filter((item) => item.price && item, )
    sortedData = dataOrdenadaClear.sort((a, b) => {
      
      console.log(option)
      
      if (option.price === "Descendent") {
       
        return a.price - b.price;
      }
      // ordeno la data que me trae con un sort por primera letra del name
      if (option.price === "Ascendent") {
       
        return b.price - a.price;
      }
    }); // funcion que ordena
  }
  
  return sortedData;
 
}

export function orderedData(data, option) {
  return async function (dispatch) {
    order(data, option).then((data) =>
      dispatch({ type: ORDER_PRODUCT, payload: data })
    );
  
  };
}