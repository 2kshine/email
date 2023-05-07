import RootLayout from "./layout/RouteLayout";
import SignupPage from "./pages/SignupPage";
import { ThemeProvider, Box } from "@mui/material";
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
            backgroundColor: "#f2f2f2",
          }}
        >
          <SignupPage/>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
