import React,{useEffect} from "react";

import { useSelector,useDispatch  } from "react-redux";
import { getArmar } from "../redux/action";
import AllCards from '../components/AllCards'
import FirstFooter from '../components/firstFooter';
import Footer from '../components/Footer';
function Habanos() {
    const products = useSelector((state) => state.armar);
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getArmar())
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
