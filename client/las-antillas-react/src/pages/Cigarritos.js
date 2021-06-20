import React,{useEffect} from "react";

import { useSelector,useDispatch  } from "react-redux";
import { getCigarritos } from "../redux/action";
import AllCards from '../components/AllCards'
import FirstFooter from '../components/firstFooter';
import Footer from '../components/Footer';
function Habanos() {
    const products = useSelector((state) => state.cigarritos);
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getCigarritos())
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
