import { Box, Button, Card, CardActions, CardContent, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CommentList from "../components/CommentList";
import { Discussion } from "../utils/Types";
import CommentInput from "../components/CommentInput";
import { authorizedinstance } from "../utils/AxiosInstance";


export default function ViewThread({ color }: { color: "primary" }) {

  // Get data of currently viewed thread from clicked Card in ThreadList.tsx
  const location = useLocation()
  const threadData: Discussion = location.state.discussion;
  console.log(threadData)

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

  const handleEdit = () => {
    
  }

  const handleDelete = () => {
    authorizedinstance(token).delete(`/api/discussions/${threadData.id}`).then(response => {
      console.log(response);
      navigate("/");
    }).catch(error => console.log(error));
  }

  // Only thread creator can edit/delete
  // Replace edit with a button + dialog in its own component?
  const userOptions = (
    <CardActions>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </CardActions>
  )
  
  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light`}}>
      <Stack spacing={2} alignItems="center">
        <Box sx={{ height: "1vh" }}/>
        <Card variant="outlined" sx={{ width: "98%" }}>
          <CardContent>
            <Typography variant="subtitle2">
              Posted by {threadData.username}
            </Typography>
            <Typography gutterBottom variant="h6">
              {threadData.title}
            </Typography>
            <Typography>
              {threadData.description}
            </Typography>
          </CardContent>
          {isCreator && userOptions}
        </Card>
        <CommentInput />
        <CommentList />
      </Stack>
    </Paper>
  )
}