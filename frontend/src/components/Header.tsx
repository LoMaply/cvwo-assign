import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import HeaderOptions from "./HeaderOptions";

export default function Header() {

  const navigate = useNavigate();
  const mainPage = () => {
    navigate(`/`);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ md: "flex", mr: 1, cursor: "pointer" }}
            onClick={mainPage}
          >
            Forum
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <HeaderOptions />
        </Toolbar>
      </AppBar>
    </>
  );
}
