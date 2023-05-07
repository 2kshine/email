import { createTheme } from "@mui/material";

const RootLayout = createTheme({
  palette: {
    primary: {
      main: "#0077c2",
    },
    secondary: {
      main: "#ff8f00",
    },
    background: {
      default: "#f2f2f2",
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        maxHeight: "100vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f2f2f2",
      },
    },
  },
});

export default RootLayout;
