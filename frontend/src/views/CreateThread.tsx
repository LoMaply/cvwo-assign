import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { authorizedinstance } from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";


export default function CreateThread() {

  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: {value: string},
      description: {value: string}
    };
    const user = localStorage.getItem("user");
    if (user) {
      const curr = JSON.parse(user);
      const token = curr.token;
      const id = curr.user.id
      authorizedinstance(token).post(`/api/discussions`, {
        title: target.title.value,
        description: target.description.value,
        user_id: id,
      })
      .then(response => {
        console.log(response);
        navigate("/");
      })
      .catch(error => console.error(error))
    } else {
      alert("You are not logged in")
    }
  }

  return (
    <Paper elevation={10} sx={{ width: "75%", height: "80vh" }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1} alignItems="center">
          <Box sx={{ height: "10vh" }}/>
          <Typography variant="h5" sx={{ width: "75%" }}>
            Create a post
          </Typography>

          <TextField 
            autoFocus
            type="text"
            name="title"
            label="Title"
            sx={{ width: "75%" }}
            inputProps={{ maxLength: 300 }}
          />
          <TextField 
            multiline
            minRows={9}
            maxRows={20}
            type="text"
            name="description"
            label="Text (optional)"
            sx={{ width: "75%" }}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
};
