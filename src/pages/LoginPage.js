import React, { useEffect } from "react";
import axios from "axios";
import { Box, Grid, TextField, Button } from "@mui/material";
import PasswordSchema from "../validations/restvalidaiton";

import { useFormik } from "formik";
const LoginPage = () => {
  const handleSubmit = (e) => {
    console.log("alerted");
  };
  const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/v1/users",
    withCredentials: true,
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmation_password: "",
      //   user_level: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: async (values) => {
        try {
            const response = await apiClient.post(
              "/verify-email?token=e4fc1bf556a7fc1e44b64de9bf4c67e383aa1fce9dccab7172ce399ab1fb492f", values,
              {
                Headers: {
                  Cookie: document.cookie,
                },
              }
            );
            console.log(response);
          } catch (err) {
            console.log(err);
          }
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={1.5}>
        {/* Splitting grid item into two parts. */}

        <Grid item xs={12} sm={6}>
          <TextField
            id="first_name"
            label="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.first_name && formik.errors.first_name}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="last_name"
            label="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.last_name && formik.errors.last_name}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
    </Box>
  );
};
export default LoginPage;
