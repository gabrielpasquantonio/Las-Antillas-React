import React,{useEffect} from "react";

import { useSelector,useDispatch  } from "react-redux";
import { getHabanos } from "../redux/action";
import AllCards from '../components/AllCards'
import FirstFooter from '../components/firstFooter';
import Footer from '../components/Footer';
function Habanos() {
    const products = useSelector((state) => state.habanos);
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getHabanos())
      }, []);
      console.log(products)
    
    return (
        <div>
            <AllCards allProducts={products}/> 
            <FirstFooter/>
            <Footer/>
        </div>
    )
}

export default Habanos
