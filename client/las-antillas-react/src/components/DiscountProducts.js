import React,{useEffect} from "react";
import styled from "styled-components";
import { useSelector,useDispatch  } from "react-redux";
import { getDiscountProducts } from "../redux/action";
import Cards from './Cards'

function DiscountProducts() {
    const discount = useSelector((state) => state.discountProducts);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDiscountProducts())
      }, []);



  return <div>

      <Cards discountProducts={discount}/>
  </div>;
}


export default DiscountProducts;
