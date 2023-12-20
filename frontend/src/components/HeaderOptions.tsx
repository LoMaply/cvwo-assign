import { Button, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import { emptyUser,User } from "../utils/Types";
import Login from "./Login";


export default function HeaderOptions() {
  const { user, logoutUser } = useContext(AuthContext) as { user: User, logoutUser: () => void };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutUser();
  };

  // Display changes depending on status of authentication
  if (user == emptyUser) {
    return <Login />;
  } else {
    return (
      <>
      <Button 
        id="header-button"
        sx={{ flexGrow: 0 }} 
        color="inherit"
        onClick={handleClick}
        aria-controls={open ? 'header-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {user.username}
      </Button>
      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "header-button",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
    );
  }
}
