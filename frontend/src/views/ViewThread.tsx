import { Box, Button, Card, CardActions, CardContent, Paper, Stack, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CommentList from "../components/CommentList";
import { Discussion } from "../utils/Types";
import CommentInput from "../components/CommentInput";
import { authorizedinstance } from "../utils/AxiosInstance";
import { useState } from "react";


export default function ViewThread({ color }: { color: "primary" }) {

  // Determines which main card content to display
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Get data of currently viewed thread from clicked Card in ThreadList.tsx
  const location = useLocation()
  let threadData: Discussion = location.state.discussion;
  console.log(threadData)
  console.log(threadData.description)

  // Get current logged in user if existing
  let isCreator = false;
  let token = "";
  const user = localStorage.getItem("user");
  if (user) {
    const curr = JSON.parse(user);
    isCreator = threadData.username == curr.user.username;
    token = curr.token;
  }

  const navigate = useNavigate();

  // No checks for logged in for handleDelete/handleEdit as only logged in users can access these buttons
  const handleDelete = () => {
    authorizedinstance(token).delete(`/api/discussions/${threadData.id}`)
    .then(response => {
      console.log(response);
      navigate("/");
    })
    .catch(error => console.log(error));
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: {value: string},
      description: {value: string}
    };
    authorizedinstance(token).patch(`/api/discussions/${threadData.id}`, {
      title: target.title.value,
      description: target.description.value,
    })
    .then(response => {
      // Reload thread page with updated information
      navigate(location.pathname, {state:{discussion: response.data.data.attributes}});
      setIsEditing(false);
    })
    .catch(error => console.log(error));
  };

  // Only displays edit/delete buttons for thread creator
  const userOptions = (
    <CardActions>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </CardActions>
  )

  // Main card content
  const mainContent = () => {
    if (isEditing) {
      return (
        <CardContent>
          <form onSubmit={handleEdit}>
            <Stack spacing={1} alignItems="center">
              <TextField 
                autoFocus
                type="text"
                name="title"
                label="Title"
                defaultValue={threadData.title}
                sx={{ width: "99%" }}
                inputProps={{ maxLength: 300 }}
              />
              <TextField 
                multiline
                minRows={4}
                maxRows={9}
                type="text"
                name="description"
                label="Text (optional)"
                defaultValue={threadData.description}
                sx={{ width: "99%" }}
              />
              <Stack direction="row">
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>)
    } else {
      return (
        <>
          <CardContent>
            <Typography variant="subtitle2">
              Posted by {threadData.username}
            </Typography>
            {<Typography gutterBottom variant="h6">
              {threadData.title}
            </Typography>}
            <Typography style={{ whiteSpace: "pre-wrap" }}>
              {threadData.description}
            </Typography>
          </CardContent>
          {isCreator && userOptions}
        </>
      )
    }
  }
  
  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light`}}>
      <Stack spacing={2} alignItems="center">
        <Box sx={{ height: "1vh" }}/>
        <Card variant="outlined" sx={{ width: "98%" }}>
          {mainContent()}
        </Card>
        <CommentInput />
        <CommentList />
      </Stack>
    </Paper>
  )
}