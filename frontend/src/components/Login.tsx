import {  Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext) as {loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>};

  const [open, setOpen] = useState(false);

  // Handle opening/closing login dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx={{ flexGrow: 0 }} color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={loginUser}>
            <TextField autoFocus type="text" name="username" label="Username" />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
