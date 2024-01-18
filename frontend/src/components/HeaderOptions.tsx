import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { emptyUser,User } from "../utils/Types";
import Login from "./Login";

/**
 * Rightmost component on header, displaying either a Login button or dropdown with several user options.
 */
export default function HeaderOptions() {
  const { user, logoutUser } = useContext(AuthContext) as { user: User, logoutUser: () => void };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    handleClose();
    logoutUser();
  }

  const navigate = useNavigate();
  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  }

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
          <MenuItem onClick={handleProfile}>
            <AccountCircleIcon fontSize="small" sx={{ marginLeft: "-9px", marginRight: "5px" }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{marginLeft: "-7px", marginRight: "3px" }} /> Logout
          </MenuItem>
        </Menu>
      </>
    );
  }
}
