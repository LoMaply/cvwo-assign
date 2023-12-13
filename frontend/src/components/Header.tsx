import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import AuthContext from "../context/AuthContext";
import { User, emptyUser } from "../utils/Types";

export default function Header() {
  const { user, logoutUser } = useContext(AuthContext) as { user: User, logoutUser: () => void };

  // Displays Login/Logout button depending on status of authentication
  const isLoggedIn = () => {
    if (user != emptyUser) {
      return (
        <Button sx={{ flexGrow: 0 }} color="inherit" onClick={logoutUser}>
          Logout
        </Button>
      );
    } else {
      return <Login />;
    }
  };



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
          {isLoggedIn()}
        </Toolbar>
      </AppBar>
    </>
  );
}
