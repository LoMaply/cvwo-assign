import { Autocomplete, Box, Button, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { authorizedinstance } from "../utils/AxiosInstance";
import categories from "../utils/CategoryOptions";
import { useState } from "react";


export default function CreateThread() {

  const [category, setCategory] = useState<string>(categories[0]);

  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: {value: string},
      description: {value: string}
    };
    const user = localStorage.getItem("user");
    if (target.title.value == "") {
      alert("Title cannot be empty");
      return;
    }
    if (user) {
      const curr = JSON.parse(user);
      const token = curr.token;
      const id = curr.user.id
      authorizedinstance(token).post(`/api/discussions`, {
        title: target.title.value,
        description: target.description.value,
        category: category,
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

          <Stack direction="row" justifyContent="center" sx={{ width: "75%" }}>
            <Select
              defaultValue={categories[0]}
              onChange={(event: SelectChangeEvent) => setCategory(event.target.value)}
              sx={{ width: "25%", minWidth: "170px" }}
            >
              {categories.map((item, i) => (<MenuItem value={item} key={i}>{item}</MenuItem>))}
            </Select>
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
