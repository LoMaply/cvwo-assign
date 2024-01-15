import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import AuthContext from "../context/AuthContext";
import { User } from "../utils/Types";
import { useNavigate } from "react-router-dom";


/**
 * Tab in Profile page displaying options to update username and delete account.
 */
export default function ProfileOptions() {

  const { user, updateUser, deleteUser } = useContext(AuthContext) as { user: User, updateUser: (token: string, name: string) => Promise<void>, deleteUser: (token: string) => Promise<void> };
  const [open, setOpen] = useState<boolean>(false);

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
    updateUser(token, target.username.value);
    navigate("/");
  }

  const handleDelete = async () => {
    setOpen(false);
    deleteUser(token);
    navigate("/");
  }
  
  return (
    <>
      <Stack direction="row" alignItems="center" marginBottom="2vh">
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