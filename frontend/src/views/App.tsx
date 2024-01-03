import { Box, createTheme,ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import ScrollToTop from "../components/Scroll";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../utils/PrivateRoute";
import CreateThread from "./CreateThread";
import Empty from "./Empty";
import Home from "./Home";
import Profile from "./Profile";
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
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile color="primary" />} />
              </Route>

              <Route path="/" element={<Home color="primary" />} />
              <Route path="/submit" element={<CreateThread />} />
              <Route path="/thread/:username/:title" element={<ViewThread color="primary" />} />
              <Route path="*" element={<Empty color="primary" />} />
            </Routes>
          </Box>
          <ScrollToTop />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
