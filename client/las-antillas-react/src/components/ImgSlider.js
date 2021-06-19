import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Banner1 from "../assets/banner5.jpg"
import Banner2 from "../assets/banner6.jpg"
import Banner3 from "../assets/banner7.jpg"
import Banner4 from "../assets/banner8.jpg"


const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <a>
        <H2 >Tabaqueria Las Antillas</H2>
                <H4> Clase y Estilo</H4>
                <H5>Toda la diversidad y sofisticación del mundo del tabaco en un solo
                    lugar</H5>
                    <NavLink exact to="/allProducts"><Button type="button " class="btn btn-dark btn-lg btn-block ">Ver todos los productos</Button></NavLink>
           <img src={Banner1} alt="" />
        </a>
      </Wrap>

      <Wrap>
        <a>
        <H2 >Tabaqueria Las Antillas</H2>
                <H4> Clase y Estilo</H4>
                <H5>Toda la diversidad y sofisticación del mundo del tabaco en un solo
                    lugar</H5>
                    <NavLink exact to="/allProducts"><Button type="button " class="btn btn-dark btn-lg btn-block ">Ver todos los productos</Button></NavLink>
        <img src={Banner2} alt="" />
        </a>
      </Wrap>

      <Wrap>
        <a>
        <H2 >Tabaqueria Las Antillas</H2>
                <H4> Clase y Estilo</H4>
                <H5>Toda la diversidad y sofisticación del mundo del tabaco en un solo
                    lugar</H5>
                    <NavLink exact to="/allProducts"><Button type="button " class="btn btn-dark btn-lg btn-block ">Ver todos los productos</Button></NavLink>
        <img src={Banner3} alt="" />
        </a>
      </Wrap>

      <Wrap>
        <a>
        <H2 >Tabaqueria Las Antillas</H2>
                <H4> Clase y Estilo</H4>
                <H5>Toda la diversidad y sofisticación del mundo del tabaco en un solo
                    lugar</H5>
                    <NavLink exact to="/allProducts"><Button type="button " class="btn btn-dark btn-lg btn-block ">Ver todos los productos</Button></NavLink>
        <img src={Banner4} alt="" />
        </a>
      </Wrap>
    </Carousel>
  );
};

const Button = styled.button`
position: absolute;
margin-top:11%;
margin-left: 10%;
color:rgb(249,249,249);
background-color: #090b13;

`;

const H5 = styled.h5`
position: absolute;
margin-top:9%;
margin-left: 10%;
color:rgb(249,249,249)
`;
const H4 = styled.h4`
position: absolute;
margin-top:7%;
margin-left: 10%;
color:rgb(249,249,249)
`;
const H2 = styled.h2`
position: absolute;
margin-top:5%;
margin-left: 10%;
color:rgb(249,249,249)
`;


const Carousel = styled(Slider)`
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button:before {
    color: white;
  }
  .slick-list {
    overflow: initial;
  }
  .slick-prev {
    left: -75px;
  }
  .slick-next {
    right: -75px;
  }
  
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    padding-top:1px;
   
    img {
      width: 100%;
      height: 100%;
      max-height: 350px;
    }
    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;


export default ImgSlider;