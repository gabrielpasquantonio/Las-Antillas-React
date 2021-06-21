import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PrimaryButton({ title, formik }) {
  const notify = () =>
    toast.success("Product added to cart", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <PrimaryButtonStyled
      disabled={!formik.isValid || !formik.dirty}
      onClick={notify}
      type="submit"
    >
      {title}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PrimaryButtonStyled>
  );
}

const PrimaryButtonStyled = styled.button`
  background-color: var(--primary-color);
  padding: 0.8rem 1.5rem;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  text-transform: uppercase;
  position: relative;
  transition: all 0.4s ease-in-out;
  height: 40px;
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0.2rem;
    transition: all 0.4s ease-in-out;
    left: 0;
    bottom: 0;
    opacity: 0.7;
  }
  &:hover::after {
    width: 100%;
    background-color: var(--white-color);
  }
  :disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
  @media (max-width: 508px) {
    padding: 0.4rem 1.5rem;
    font-size: small;
  }
`;
export default PrimaryButton;