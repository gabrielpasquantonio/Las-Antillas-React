import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import styled from "styled-components";
import img1 from "../assets/visa.png"
import img2 from "../assets/cabal.png"
import img3 from "../assets/maestro.png"
import img4 from "../assets/mastercard.png"
import img5 from "../assets/americanexpress.png"

function firstFooter() {
  return (
    <Content>
      <Diiv>
        <DivII>
          <H5>Tabaqueria Las Antillas</H5>

          <H6>Rivadavia 214B1642CEF San Isidro, Buenos Aires, Argentina</H6>
        </DivII>
      </Diiv>
      <Div>
        <DivII>
          <H5>Contactános</H5>
          <Contact>
            <Flex>
              <MailIcon />
              <H6>lasantillas.tabaqueria@gmail.com</H6>
            </Flex>
            <Flex>
              <PhoneIcon />
              <H6>+54 11-6354-0045</H6>
            </Flex>
          </Contact>
        </DivII>
      </Div>
      <Div>
        <DivII>
          <H5>Sigamos Conectados</H5>
          <Flex>
            <A href="https://www.instagram.com/tabaqueria.lasantillas/" target="blank">
              <InstagramIcon style={{ fontSize: 40 }} />
            </A>
            <A href="https://www.facebook.com/Las-Antillas-Tabaqueria-679131215792588/" target="blank">
            <FacebookIcon style={{ fontSize: 40 }} /></A>
          </Flex>
        </DivII>
      </Div>
      <Div>
        <DivII>
          <H5>Medios de pago</H5>
          <Flex>
          <Img class="Payment-logos" src={img1}/>
                            <Img class="Payment-logos" src={img2}/>
                            <Img class="Payment-logos" src={img3}/>
                            <Img class="Payment-logos" src={img4}/>
                            <Img class="Payment-logos" src={img5}/>
          </Flex>
        </DivII>
      </Div>
    </Content>
  );
}

const Img = styled.img`
max-height: 35px;
                margin: 2px;
`;



const A = styled.a`
color:#090b13;
`;
const Flex = styled.div`
  display: flex;

  align-items: center;
`;

const Contact = styled.div`
  display: row;
`;

const Content = styled.div`
  display: flex;

  justify-content: space-between;
  position: relative;
  color: #090b13;
  background: rgb(249, 249, 249);
`;

const Div = styled.div`
  display: flex;
`;
const Diiv = styled.div`
  display: flex;
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
export default firstFooter;
