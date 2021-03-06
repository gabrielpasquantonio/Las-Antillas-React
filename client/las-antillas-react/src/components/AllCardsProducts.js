import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function AllCardsProdcuts(props) {
  const { allProducts, loading, data } = props;

  function brand(action) {
    switch (action) {
      case 1: {
        return "Cohiba";
      }

      case 2: {
        return "Montecristo";
      }
      case 3: {
        return "Partagás";
      }
      case 4: {
        return "Vegafina";
      }
      case 5: {
        return "Te Amo";
      }
      case 6: {
        return "Placeres";
      }
      case 7: {
        return "Casa De Garcia";
      }
      case 8: {
        return "Romeo Y Julieta";
      }
      case 9: {
        return "Holger Danske";
      }
      case 10: {
        return "Amphora";
      }
      case 11: {
        return "MacBaren";
      }
      case 12: {
        return "Falandria";
      }
      case 13: {
        return "Cheetah";
      }
      case 14: {
        return "Redfield";
      }
      case 15: {
        return "Moro";
      }
    }
  }
  function category(action) {
    switch (action) {
      case 1: {
        return "Habano";
      }

      case 2: {
        return "Cigarros";
      }
      case 3: {
        return "Cigarritos";
      }
      case 4: {
        return "Tabaco Para Pipa";
      }
      case 5: {
        return "Tabaco Para Armar";
      }
      case "allProducts": {
        return "All Prodcuts";
      }
      case "habanos": {
        return "Habanos";
      }
    }
  }
  return (
    <div>
      {data ? (
        <>
          <Content>
            {data ? (
              <Card>
                <Wrap key={data.id}>
                  <Link
                    to={{
                      pathname: `/products/${data.id}`,
                      state: { category: data.category },
                    }}
                  >
                    <img
                      src={`../images/allImages/${data.image.toLowerCase()}`}
                      alt={data.name}
                    />
                  </Link>
                </Wrap>

                <Bottom>
                  <Div>
                    <SubDiv>
                      <div>
                        <H4>Categoria: {category(data.category)} </H4>
                      </div>
                      <div>
                        <H4> Marca: {brand(data.brand)}</H4>
                      </div>
                    </SubDiv>
                  </Div>
                  <Div>
                    <SubDiv>
                      <div>
                        <H4> Name: {data.name}</H4>
                      </div>
                      <div>
                        <H4>Price: ${data.price}</H4>
                      </div>
                    </SubDiv>
                  </Div>
                </Bottom>
              </Card>
            ) : (
              <H1>Loading...</H1>
            )}
          </Content>
        </>
      ) : (
        <><H2>All Products</H2>
          <Content>
            
            {allProducts !== undefined ? (
              allProducts.map((product) => (
                <Card>
                  <Wrap key={product.id}>
                    <Link
                      to={{
                        pathname: `/products/${product.id}`,
                        state: { category: product.category },
                      }}
                    >
                      <img
                        src={`../images/allImages/${product.image.toLowerCase()}`}
                        alt={product.name}
                      />
                    </Link>
                  </Wrap>

                  <Bottom>
                    <Div>
                      <SubDiv>
                        <div>
                          <H4>Categoria: {category(product.category)} </H4>
                        </div>
                        <div>
                          <H4> Marca: {brand(product.brand)}</H4>
                        </div>
                      </SubDiv>
                    </Div>
                    <Div>
                      <SubDiv>
                        <div>
                          <H4> Name: {product.name}</H4>
                        </div>
                        <div>
                          <H4>Price: ${product.price}</H4>
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
      )}
    </div>
  );
}

const H2 = styled.h2`
  margin-top: 100px;
  padding: 20px;
`;

const Content = styled.div`
  padding: 10px;
  margin-bottom: 30px;
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
  background-color: rgb(249, 249, 249);
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
export default AllCardsProdcuts;
