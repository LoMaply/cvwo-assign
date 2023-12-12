import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Header from "../components/Header";
import NewThread from "../components/NewThread";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box display='flex' justifyContent='center' style={{paddingTop: '64px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<NewThread />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
