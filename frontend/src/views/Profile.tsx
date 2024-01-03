import { Box, Button, Card, CardContent, FormGroup, Paper, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { User } from "../utils/Types";


export default function Profile({ color }: { color: "primary" }) {

  const { user, updateUser, deleteUser } = useContext(AuthContext) as { user: User, updateUser: (token: string, name: string) => Promise<void>, deleteUser: (token: string) => Promise<void> };

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
    deleteUser(token);
    navigate("/");
  }

  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light`}}>
      <Stack spacing={1} alignItems="center">
        <Box />
        <Card variant="outlined" sx={{ width: "98%" }}>
          <CardContent>
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
            <Button type="submit" variant="contained" size="small" onClick={handleDelete}>Delete Profile</Button>
          </CardContent>
        </Card>
      </Stack>
    </Paper>
  );
}