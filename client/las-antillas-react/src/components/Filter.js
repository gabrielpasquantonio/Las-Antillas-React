import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getAllProducts,
  orderedData,
 
} from "../redux/action";

function Filter(props) {
  const { pageInfo, page } = props;
  const total = useSelector((state) => state.total);
  const limit = useSelector((state) => state.limit);

 


  async function handleSelectedName(event) {
    props.order([...props.allProducts], { name: event.target.value });
    if (event.target.value === "Select") {
        await props.getAllProducts();
      }
  }
  async function handleSelectedPopulation(event) {
    props.order([...props.allProducts], { price: event.target.value });
    if (event.target.value === "Select") {
      await props.getAllProducts();
    }
  }
 
  return (
    <Container>
      
      <Div>
        <Label>Order by Price: </Label>
        <Select onChange={handleSelectedPopulation}>
          <option label="Select" value="Select"></option>
          <option value="Ascendent" label="Highest to Lowest"></option>
          <option value="Descendent" label="Lowest to Highest"></option>
        </Select>
      </Div>
      <Div>
        <Label>Order by Name: </Label>
        <Select onChange={handleSelectedName}>
        <option value="Select">Select</option>
          <option value="Ascendent">A-Z</option>
          <option value="Descendent">Z-A</option>
          
        </Select>
      </Div>

    
  
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
    
  }; // bring the redux state
};
const mapDispatchToProps = (dispatch) => {
  return {
    order: (data, option) => dispatch(orderedData(data, option)),
    getAllProducts: () =>
      dispatch(getAllProducts()),
  };
};

const Div = styled.div`
  display: row;
  @media (max-width: 768px) {
    display: flex;
    margin-top: 5px;
  }
`;

const Container = styled.div`
 margin-top:90px;
 margin-right: 10px;
 margin-left: 10px;
 flex-direction: row;
  border-style: solid;
  border-color: rgba(249, 249, 249, 0.8);
  border-width: 0.1px;
  display: flex;
  //margin: 10px 10px;
  flex: 1;
  padding: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Label = styled.label`
  margin-right: 10px;
  color: rgb(255, 255, 255);
  font-size: 17px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 15px;
    margin-right: 10px;
  }
`;
const Select = styled.select`
  margin-right: 10px;
  background: rgb(189, 200, 222);
  border-radius: 7px;
  font-size: 17px;
  @media (max-width: 768px) {
    font-size: 15px;
    border-radius: 7px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Filter);