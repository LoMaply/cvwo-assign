import { Box, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import CreateThread from "./CreateThread";
import Home from "./Home";
import { AuthProvider } from "../context/AuthContext";
import ViewThread from "./ViewThread";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#aa49d2",
        light: "#e1bfef",
      },
    }
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Header />
          <Box display="flex" justifyContent="center" style={{ paddingTop: "64px" }}>
            <Routes>
              <Route path="/" element={<Home color="primary" />} />
              <Route path="/submit" element={<CreateThread />} />
              <Route path="/thread/:username/:title" element={<ViewThread color="primary" />} />
            </Routes>
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
