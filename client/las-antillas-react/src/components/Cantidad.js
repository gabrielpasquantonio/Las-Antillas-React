import React from "react";
import "./CreateForm.css";
import { Formik, Form } from "formik";
import TextField from "./TextField.js";
import * as Yup from "yup";
import PrimaryButton from "./PrimaryButton";
import styled from "styled-components";
import { useDispatch, connect } from "react-redux";
function Cantidad(props) {
  const initialValues = {
    cantidad: 0,
  };
  const dispatch = useDispatch();
  const validate = Yup.object({
    cantidad: Yup.number().min(1, "Must  have a minimun value of 1"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      dispatch={dispatch}
      onSubmit={async (values, { resetForm }) => {
        await new Promise((r) => setTimeout(r, 500));
        console.log("added")
        //await dispatch(createActivity(values));
        resetForm();
      }}
    >
      {(formik) => (
        <div>
          <Form className="Form">
            <Diiv className="form-field" name="id" />

            <div className="form-field">
              <TextField
                label="Quantity"
                name="cantidad"
                type="number"
                className="input"
              />
            </div>

            {/*<pre>{JSON.stringify(formik, null, 4)}</pre>*/}
            <div className="but">
              <div className="form-field ">
                <PrimaryButton title="Add to Cart" type="submit" formik={formik} />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

const Diiv = styled.div`
  display: none;
`;

const H2 = styled.h2`
  font-size: 60px;
  margin-bottom: 60px;
  color: var(--font-light-color);
  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 30px;
  }
`;
export default Cantidad;
