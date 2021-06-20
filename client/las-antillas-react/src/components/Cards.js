import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Cards(props) {
  const { discountProducts } = props;

  console.log(typeof products);
  console.log(discountProducts);
  return (
    <>
      <h2>ON SALE!</h2>
      <Content>
        {discountProducts && discountProducts.productoConDescuento ? (
          discountProducts.productoConDescuento.map((product) => (
            <Card>
              <Wrap key={product.id}>
                <Link to={`/home`}>
                  <img
                    src={`../images/${product.categoria.toLowerCase()}/${
                      product.imagen
                    }`}
                    alt={product.nombre.value}
                  />
                </Link>
                <Img
                  src={`../images/img/icons/${product.descuento.value.slice(
                    0,
                    -1
                  )}.png`}
                  alt="Descuento 30%"
                />
              </Wrap>

              <Bottom>
                <Div>
                  <SubDiv>
                   
                    <div>
                      <H4>Categoria: {product.categoria} </H4>
                    </div>
                    <div>
                      <H4> Marca: {product.marca}</H4>
                    </div>
                  </SubDiv></Div>
                  <Div>
                  <SubDiv>
                    <div>
                      <H4> Name: {product.nombre.value}</H4>
                    </div>
                    <div>
                     
                      <H4>Price: ${product.precio.value}</H4>
                    </div>
                  </SubDiv>
                  </Div>
                  
              </Bottom>
            </Card>
          ))
        ) : (
          <H1>Loading...</H1>
        )}
      </Content>
    </>
  );
}

const Img = styled.img`
  left: 310px !important;
  //top:30px!important;
  position: absolute;
  height: 45px !important;
  width: 40px !important;
  border-radius: 60% !important;
`;

const Content = styled.div`
  padding: 10px;
 
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 10px;
  }
  @media (max-width: 780px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 10px;
  }
  @media (max-width: 650px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    padding: 10px;
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    padding: 10px;
  }
`;
const Div = styled.div`
  display: row;
`;
const SubDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const H4 = styled.h4`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    font-size: smaller;
  }
`;
const H1 = styled.h1`
  @media (max-width: 768px) {
    font-size: x-large;
  }
`;
const Bottom = styled.div`
  display: row;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 768px) {
    margin-top: 5px;
    padding: 10px;
  }
  @media (max-width: 1280px) {
    margin-top: 5px;
    padding: 10px;
  }
`;

const Card = styled.div`
 background-color: rgb(249,249,249);
 color: #090b13;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgb(249, 249, 249);
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;

  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
`;
export default Cards;
