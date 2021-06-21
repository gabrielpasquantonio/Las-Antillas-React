import React from "react";
import { ErrorMessage, useField } from "formik";
import './TextField.css'
import styled from 'styled-components'


function TextField({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        className={`form-control shadow-none ${meta.touched && meta.error && `is-invalid`}`}
        {...field}
        {...props}
        autoComplete="off"
      ></Input>
    
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

const Label = styled.label`
  @media (max-width: 768px) {
    font-size: 20px;
    //margin-bottom: 30px;
  }
`;

const Input = styled.input`
 @media (max-width: 768px) {
max-height:30px;    //margin-bottom: 30px;
  }
`;




export default TextField;