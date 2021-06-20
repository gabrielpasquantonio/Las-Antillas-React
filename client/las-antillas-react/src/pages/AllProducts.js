import React,{useEffect} from "react";

import { useSelector,useDispatch  } from "react-redux";
import { getAllProducts } from "../redux/action";
import AllCardsProducts from '../components/AllCardsProducts'

function AllProducts() {
    const products = useSelector((state) => state.allProducts);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProducts())
      }, []);
    
    
    return (
        <div>
            <AllCardsProducts allProducts={products}/> 
        </div>
    )
}

export default AllProducts
