import {  Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import React, { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";

export default function Login() {
  const { loginUser, registerUser } = useContext(AuthContext) as {loginUser: (name: string) => Promise<void>, registerUser: (name: string) => Promise<void>};

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  // Handle opening/closing login dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChecked(false);
  };

  const handleChange = () => {
    setChecked(!checked)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: {value: string}
    };

    if (checked) {
      registerUser(target.username.value);
    } else {
      loginUser(target.username.value);
    }
  }

  return (
    <>
      <Button sx={{ flexGrow: 0 }} color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField autoFocus type="text" size="small" variant="filled" name="username" label="Username" />
            <Box >
              <FormControlLabel 
                control={
                  <Checkbox checked={checked} onChange={handleChange} />
                }
                label="Create Account"
              />
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
