import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/action";
import { useLocation } from "react-router-dom";
import Cantidad from "./Cantidad";
import Envio from "./Envio";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import StorefrontIcon from "@material-ui/icons/Storefront";
function ProductDetail() {
  let data = useLocation();
  console.log(data.state.category);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productId);
  const { id } = useParams();
  const category = data.state.category;
  useEffect(() => {
    dispatch(getProduct(id, category));
  }, []);

  console.log(productDetail);




  
  if (productDetail === null) {
    return <Div>Product not found</Div>;
  } else if (productDetail === undefined) {
    return <Div>Loading...</Div>;
  } else {
    return (
      <Container>
        <Image>
          <Wrap>
            <img
              alt={productDetail.name}
              src={`../images/allImages/${productDetail.image.toLowerCase()}`}
            />
          </Wrap>
        </Image>
        <Details>
          <Div>
            <H1>{productDetail.name.toUpperCase()}</H1>
          </Div>
          <DivPrice>
            <H2>${productDetail.price}</H2>
          </DivPrice>
          <Cantidade>
            <Cantidad />
          </Cantidade>
          <DivEnvio>
            <LocalShippingIcon style={{ fontSize: 25 }} />{" "}
            <H4>medios de envio</H4>
          </DivEnvio>
          <Cantidade>
            <Envio />
          </Cantidade>
          <DivEnvio>
            <a
              class="text-primaryy font-small"
              href="https://www.correoargentino.com.ar/formularios/cpa"
              target="_blank"
              style={{ color: "white" }}
            >
              No sé mi código postal
            </a>
          </DivEnvio>
          <DivStore>
          <DivEnvio>
            <StorefrontIcon style={{ fontSize: 25 }} /> <H4>Nuestro Local</H4>
          </DivEnvio>
         
            <H44>
              Tabaqueria Las Antillas - Reconquista 976 CABA Lunes a Viernes de
              11 a 16hs Exclusivo pick up durante la cuarentena.
            </H44>
          </DivStore>
        </Details>
      </Container>
    );
  }
}

const Cantidade = styled.div`
  display: row;
`;
const H4 = styled.h4`
  margin-left: 10px;
  margin-bottom: 0px;
  margin-top: 0px;
`;
const H44 = styled.h4`
  margin-left: 10px;
  margin-bottom: 0px;
  margin-top: 0px;
  padding: 20px;
`;
const H1 = styled.h1`
  margin: 0px;
`;
const H2 = styled.h2`
  margin: 0px;
`;

const Wrap = styled.div`
  margin: 16.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 13px solid rgb(249, 249, 249);
  height: 500px;
  width: 700px;
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: relative;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
`;

const Div = styled.div`
  margin-top: 99px;
  color: white;
  display: flex;
  margin-bottom: 5px;
`;
const DivPrice = styled.div`
  color: white;
  display: flex;
`;
const DivStore = styled.div`
  color: white;
  display: row;
  border: 5px solid rgb(249, 249, 249);
  border-radius: 20px;
  margin-top:10px
`;
const DivEnvio = styled.div`
  color: white;
  display: flex;
  margin-top: 10px;
  padding: 0px;
`;
const Image = styled.div`
  display: flex;
`;

const Details = styled.div`
  display: row;
`;

const Container = styled.div`
  display: flex;
`;

export default ProductDetail;
