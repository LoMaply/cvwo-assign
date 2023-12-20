import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import { authorizedinstance } from "../utils/AxiosInstance";
import { Reply, User } from "../utils/Types";



export default function CommentCard({comment, childTracker, setChildTracker}: {comment: Reply, childTracker: number, setChildTracker: React.Dispatch<React.SetStateAction<number>>}) {

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { user } = useContext(AuthContext) as { user: User };

  // Get current logged in user if existing
  let token = "";
  const person = localStorage.getItem("user");
  if (person) {
    const curr = JSON.parse(person);
    token = curr.token;
  }

  // No checks for logged in for handleDelete/handleEdit as only logged in users can access these buttons
  const handleDelete = () => {
    authorizedinstance(token).delete(`/api/comments/${comment.id}`)
    .then(response => {
      setChildTracker(childTracker + 1);
    })
    .catch(error => console.log(error));
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      description: {value: string}
    };
    authorizedinstance(token).patch(`/api/comments/${comment.id}`, {
      description: target.description.value,
    })
    .then(response => {
      // Update thread with new info
      setChildTracker(childTracker + 1);
      setIsEditing(false);
    })
    .catch(error => console.log(error));
  };

  const userOptions = (
    <CardActions>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </CardActions>
  )

  const content = () => {
    if (isEditing) {
      return (
        <CardContent>
          <form onSubmit={handleEdit} >
            <TextField 
              multiline
              minRows={4}
              maxRows={9}
              type="text"
              name="description"
              label="Text (optional)"
              defaultValue={comment.description}
              sx={{ width: "99%" }}
            />
            <Stack direction="row">
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </CardContent>
      )
    } else {
      return (
        <>
          <CardContent>
            <Typography variant="subtitle2">
              Posted by {comment.username}
            </Typography>
            <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
              {comment.description}
            </Typography>
          </CardContent>
          {(user.username == comment.username) && userOptions}
        </>
      )
    }
  }

  return (
    <Card variant="outlined" sx={{ width: "98%" }}>
      {content()}
    </Card>
  )
}