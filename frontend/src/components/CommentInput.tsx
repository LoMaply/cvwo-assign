import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { authorizedinstance } from "../utils/AxiosInstance";
import { SetStateAction, useState } from "react";


export default function CommentInput({childTracker, setChildTracker, discussionid}: {childTracker: number, setChildTracker: React.Dispatch<React.SetStateAction<number>>, discussionid: number}) {

  const [ inputValue, setInputValue ] = useState<string>("");

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    if (user) {
      const curr = JSON.parse(user);
      const token = curr.token;
      const id = curr.user.id;

      authorizedinstance(token).post(`/api/comments`, {
        description: inputValue,
        user_id: id,
        discussion_id: discussionid,
      })
      .then(response => {
        // Update thread with new info
        setChildTracker(childTracker + 1);
        setInputValue("");
      })
      .catch(error => console.log(error));
    } else {
      alert("You are not logged in")
    }
  };

  return (
    <Card sx={{ width: "98%" }}>
      <CardContent>
        <Typography gutterBottom>
          Post comment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            minRows={3}
            maxRows={3}
            type="text"
            name="description"
            label="Text (optional)"
            sx={{ width: "100%" }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Stack direction="row" justifyContent="end">
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}