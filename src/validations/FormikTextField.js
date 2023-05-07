import React from "react";
//UseField hook to bing input field with corresponding value and val error.
import { TextField } from "@mui/material";

const FormikTextField = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;
  const showError = touched[name] && errors[name];
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      error={showError}
      helperText={showError && errors[name]}
      {...field}
      {...props}
    />
  );
};

export default FormikTextField;
