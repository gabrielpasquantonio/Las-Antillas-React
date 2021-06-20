import React from 'react'
import styled from 'styled-components'
import ImgSlider from "../components/ImgSlider";
import DiscountProducts from '../components/DiscountProducts';
import PreFooter from '../components/preFooter';
import FirstFooter from '../components/firstFooter';
import Footer from '../components/Footer';
function Home() {
    return (
      <>
        <Container>
             <ImgSlider/>
             <DiscountProducts/>
             <PreFooter/>
            
        </Container>
         <FirstFooter/>
         <Footer/>
      </>
    )
}



const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  margin-bottom: 7%;
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    //position: absolute;
    inset: 0px;
    opacity: 1;
    //z-index: -1;
  }
`;
export default Home
