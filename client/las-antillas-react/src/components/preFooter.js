import React from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import styled from "styled-components";

function PreFooter() {
  return (
    <div>
      <Content>
        <Diiv>
          <LocalShippingIcon style={{ fontSize: 80 }} />
          <DivII>
            <H5>Envios gratis</H5>
            <H6>Para compras superiores a $3.000</H6>
          </DivII>
        </Diiv>
        <Div>
          <AttachMoneyIcon style={{ fontSize: 80 }} />
          <DivII>
            <H5>10% Descuento</H5>
            <H6>Pagando con Débito o Efectivo</H6>
          </DivII>
        </Div>
        <Div>
          <VerifiedUserIcon style={{ fontSize: 80 }} />
          <DivII>
            <H5>Sitio seguro</H5>
            <H6>Protegemos tus datos</H6>
          </DivII>
        </Div>
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: flex;
padding-top: 20px;
  justify-content: space-between;
`;

const Div = styled.div`
  padding-left: 40px;
  display: flex;
  align-items: center;
  border-left: 5px solid;
`;
const Diiv = styled.div`
  padding-left: 40px;
  display: flex;
  align-items: center;
`;
const DivII = styled.div`
  display: row;
  padding-left: 25px;
`;
const H5 = styled.h5`
  font-size: 30px;
  margin: 10px;
`;

const H6 = styled.h6`
  font-size: 15px;
  margin: 10px;
`;
export default PreFooter;
