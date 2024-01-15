import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { authorizedinstance } from "../utils/AxiosInstance";
import { User } from "../utils/Types";


/**
 * Tab in Profile page displaying options to update username and delete account.
 */
export default function ProfileOptions() {

  const { user, deleteUser, setUser } = useContext(AuthContext) as { user: User, deleteUser: (token: string) => Promise<void>, setUser: React.Dispatch<React.SetStateAction<User>> };
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  let token = "";
  const storage = localStorage.getItem("token");
  if (storage) {
    token = JSON.parse(storage);
  }

  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: {value: string}
    };
    // Updates username
    await authorizedinstance(token).patch(`/api/users/${user.id}`, {
      username: target.username.value
    }).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
      setErrorMessage("");
      navigate("/");
    }).catch(error => {
      console.log(error);
      setErrorMessage("This username is already taken!");
    })
  }

  const handleDelete = async () => {
    setOpen(false);
    deleteUser(token);
    navigate("/");
  }
  
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" marginBottom="2vh">
        <Typography marginRight="1%" >
          Username:
        </Typography>
        <form onSubmit={handleUpdate}>
          <FormGroup row>
            <TextField 
              size="small"
              type="text"
              name="username"
              defaultValue={user.username}
            />
            <Button type="submit" variant="contained" size="small" sx={{ marginLeft: "10px" }}>Update</Button>
          </FormGroup>
        </form>
        <Typography color="red">
          {errorMessage}
        </Typography>
      </Stack>

      <Button type="submit" variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setOpen(true)}>Delete Profile</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Account Deletion?</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            This action is irreversible and will delete all posts and comments associated with your account.
          </DialogContentText>
          <Button type="submit" variant="contained" size="small" color="error" startIcon={<DeleteIcon />} sx={{ marginRight: "1vw" }} onClick={handleDelete}>Confirm</Button>
          <Button type="button" variant="outlined" size="small" onClick={() => setOpen(false)}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </>
  )

}