import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { SetStateAction, useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import { authorizedinstance } from "../utils/AxiosInstance";
import { User } from "../utils/Types";

/**
 * Textbox for submitting comments under threads.
 */
export default function CommentInput({childTracker, setChildTracker, discussionid}: {childTracker: number, setChildTracker: React.Dispatch<React.SetStateAction<number>>, discussionid: number}) {

  const { user } = useContext(AuthContext) as { user: User };

  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storage = localStorage.getItem("token");
    if (storage) {
      const token = JSON.parse(storage);

      authorizedinstance(token).post(`/api/comments`, {
        description: inputValue,
        user_id: user.id,
        discussion_id: discussionid,
      })
      .then(() => {
        // Update thread with new info
        setChildTracker(childTracker + 1);
        setInputValue("");
        setErrorMessage("");
      })
      .catch(error => console.log(error));
    } else {
      setErrorMessage("You must be logged in to post a comment!");
    }
  }

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
            label="Text"
            sx={{ width: "100%", marginBottom: "4px" }}
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <Stack direction="row" spacing={2} justifyContent="end" alignItems="center">
            <Typography color="red">
              {errorMessage}
            </Typography>
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}