import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/action";
import AllCardsProducts from "../components/AllCardsProducts";
import SearchBar from "../components/SearchBar";

function AllProducts() {
  const products = useSelector((state) => state.allProducts);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const searchProduct = async (products, product) => {
    const found = products.find((el) => el.name === product);
    console.log(found);
    return found;
  };

  const onSearch = async (product) => {
    //setLoading(true)
    console.log("this is the data " + product);
    if (!product) {
      setNotFound(false);
      setData(null);
      return;
    }
    setLoading(true);
    const result = await searchProduct(products, product);
    console.log(result);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setNotFound(false);
      setData(result);
    }
    setLoading(false);
  };
  console.log(data);
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      {notFound ? (
        <Div className="not-found-text">
          <H1>Sorry, Country not found! </H1>
        </Div>
      ) : (
        <>
          <AllCardsProducts
            allProducts={products}
            data={data}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}

const H1 = styled.h1`
  @media (max-width: 322px) {
    font-size: 10px;
  }
  @media (max-width: 768px) {
    font-size: 30px;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    font-size: 50px;
  }
  margin-bottom: 20px;
`;

const Div = styled.div`
  text-align: center;
  font-size: 1.25rem;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    display: block;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    display: flex;
  }
`;

const Img = styled.img`
  @media (max-width: 768px) {
    width: 80%;
  }
`;
export default AllProducts;
