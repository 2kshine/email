import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Box,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import axios from 'axios';
import Copyright from "../components/Copyright";
import SignupSchema from "../validations/ValidationSchema";
import Logo from "../static/images/upstreamlogo.png";

//user_level
const user_level = [
  {
    value: "Administrator",
    label: "admin",
  },
  {
    value: "Manager",
    label: "manager",
  },
  {
    value: "Developer",
    label: "developer",
  },
];

const SignupPage = () => {
  //Initialise formik with initial values, signupschema validation and handle submit.
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      //   user_level: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:8080/api/v1/users/register", values)
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=> {
            console.log(error.response.data)
        })
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      {/* Applying a set of base styles to the HTML document. */}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 25,
          padding: 10,
          boxShadow: 1,
          borderRadius: 3,
          bgcolor: "white",
        }}
      >
        <Link href="https://www.upstreamtech.io/">
          <img src={Logo} alt="Logo" />
        </Link>
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>
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
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
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
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.email && formik.errors.email
                }
                error={
                  formik.touched.email &&
                  Boolean(formik.errors.email)
                }
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                select
                id="user_level"
                label="User level"
                value={formik.values.user_level}
                onChange={formik.handleChange("user_level")}
                helperText={
                  formik.touched.user_level && formik.errors.user_level
                }
                error={
                  formik.touched.user_level && Boolean(formik.errors.user_level)
                }
                margin="dense"
                variant="outlined"
                fullWidth
              >
                {user_level.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required color="primary" />}
                label="I agree to the terms and conditions."
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Container>
  );
};

export default SignupPage;
