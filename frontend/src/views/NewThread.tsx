import { Button, Paper, Stack, TextField } from "@mui/material";
import { authorizedinstance } from "../utils/AxiosInstance";

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const target = e.target as typeof e.target & {
    title: {value: string},
    description: {value: string}
  };
  const token = localStorage.getItem('token');
  if (token) {
    authorizedinstance(token).post(`/api/discussions`, {
      title: target.title.value,
      description: target.description.value,
      user_id: 7
    })
    .then(response => console.log(response))
    .catch(error => console.error(error))
  } else {
    alert("You are not logged in")
  }
}

export default function NewThread() {
  return (
    <Paper elevation={10} sx={{ width: "68%" }} style={{ height: "50vh" }}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField 
            autoFocus
            type="text"
            name="title"
            label="Title"
          />
          <TextField 
            type="text"
            name="description"
            label="Text (optional)"
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  )
}