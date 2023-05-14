import RootLayout from "./layout/RouteLayout";
import { ThemeProvider, Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
function App() {
  const theme = RootLayout;
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            textAlign:"center",
            backgroundColor: "#d2d2d2",
          }}
        >
          <LoginPage/>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
