import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import NewThread from "./NewThread";
import Home from "./Home";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Box
          display="flex"
          justifyContent="center"
          style={{ paddingTop: "64px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<NewThread />} />
          </Routes>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
