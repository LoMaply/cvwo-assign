import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import { axiosinstance } from "../utils/AxiosInstance";
import { User } from "../utils/Types";

/**
 * Login button and dialog for login/account creation.
 */
export default function Login() {
  const { setUser } = useContext(AuthContext) as {setUser: React.Dispatch<React.SetStateAction<User>>};

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle opening/closing login dialog
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setChecked(false);
    setErrorMessage("");
  }

  const handleChange = () => {
    setChecked(!checked)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: {value: string}
    }
    if (checked) {
      registerUser(target.username.value);
    } else {
      loginUser(target.username.value);
    }
  }

  // Registers new user
  const registerUser = async (name: string) => {
    await axiosinstance.post(`/api/users`, {
      username: name
    }).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
    }).catch(error => {
      console.log(error);
      setErrorMessage("This username is already taken!");
    })
  }

  // Logs in user
  const loginUser = async (name: string) => {
    await axiosinstance.post(`/login`, {
      username: name
    }).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
    }).catch(error => {
      console.log(error);
      setErrorMessage("Invalid username!");
    });
  };

  return (
    <>
      <Button sx={{ flexGrow: 0 }} color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              autoFocus
              type="text" 
              size="small" 
              variant="filled" 
              name="username" 
              label="Username"
              autoComplete="off"
            />
            <Typography color="red">
              {errorMessage}
            </Typography>
            <FormGroup row sx={{ marginTop: "1vh" }}>
              <FormControlLabel 
                control={
                  <Checkbox checked={checked} onChange={handleChange} />
                }
                label="Create Account"
              />
              <Button type="submit" variant="contained">Submit</Button>
            </FormGroup>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
