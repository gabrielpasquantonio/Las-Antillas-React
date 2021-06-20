import React,{useEffect} from "react";

import { useSelector,useDispatch  } from "react-redux";
import { getCigarros } from "../redux/action";
import AllCards from '../components/AllCards'
import FirstFooter from '../components/firstFooter';
import Footer from '../components/Footer';
function Habanos() {
    const products = useSelector((state) => state.cigarros);
    const dispatch = useDispatch();
  console.log(products)
    useEffect(() => {
        dispatch(getCigarros())
      }, []);
      
    
    return (
        <div>
            <AllCards allProducts={products}/> 
            <FirstFooter/>
            <Footer/>
        </div>
    )
}

export default Habanos
