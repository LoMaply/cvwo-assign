import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, Paper, Stack, TextField, Typography } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CommentCard from "../components/CommentCard";
import CommentInput from "../components/CommentInput";
import AuthContext from "../context/AuthContext";
import { authorizedinstance, axiosinstance } from "../utils/AxiosInstance";
import { Discussion, emptyDiscussion, Reply, ResponseObject, User } from "../utils/Types";

/**
 * Page for viewing full details of thread, including comments.
 */
export default function ViewThread({ color }: { color: "primary" }) {

  const { user } = useContext(AuthContext) as { user: User };

  // Determines which main card content to display
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [threadData, setThreadData] = useState<Discussion>(emptyDiscussion);
  const [commentList, setCommentList] = useState<Array<Reply>>([]);

  // Dialog for delete confirmation
  const [open, setOpen] = useState<boolean>(false);

  // Allows children components to trigger useEffect below, which updates thread data and comment list
  const [childTracker, setChildTracker] = useState<number>(0);

  // Get data of currently viewed thread and associated comments
  const { discussionid } = useParams();

  useEffect(() => {
    updateThread();
  }, [childTracker]);

  const updateThread = async () => {
    await axiosinstance.get(`/api/discussions/${discussionid}`)
    .then(response => {
      setThreadData(response.data.data.attributes);
      const commentList = response.data.included.map((item: ResponseObject) => item.attributes);
      setCommentList(commentList.sort((a:Reply, b:Reply) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime())));
    })
    .catch(error => console.log(error));
  }

  // Get current logged in user if existing
  let token = "";
  const storage = localStorage.getItem("token");
  if (storage) {
    token = JSON.parse(storage);
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
    .then(() => {
      // Update thread with new
      setChildTracker(childTracker + 1)
      setIsEditing(false);
    })
    .catch(error => console.log(error));
  }

  // Only displays edit/delete buttons for thread creator
  const userOptions = (
    <CardActions>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
      <Button onClick={() => setOpen(true)}>Delete</Button>
    </CardActions>
  );

  // Main card content
  const mainContent = () => {
    if (isEditing) {
      return (
        <CardContent>
          <form onSubmit={handleEdit}>
            <Stack spacing={1}>
              <TextField 
                autoFocus
                type="text"
                name="title"
                label="Title"
                defaultValue={threadData.title}
                sx={{ width: "99%" }}
                inputProps={{ maxLength: 300 }}
                required
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
              <Stack direction="row" spacing={1}>
                <Button type="submit" variant="contained">Save</Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>)
    } else {
      return (
        <>
          <CardContent>
            <Typography variant="subtitle2">
              Posted by {threadData.username} {threadData.created_at != "" && formatDistanceToNowStrict(new Date(threadData.created_at))} ago
            </Typography>
            {<Typography gutterBottom variant="h6">
              {threadData.title}
            </Typography>}
            <Typography style={{ whiteSpace: "pre-wrap" }}>
              {threadData.description}
            </Typography>
          </CardContent>
          {(user.username == threadData.username) && userOptions}
        </>
      )
    }
  }
  
  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light`}}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Post?</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            This action is irreversible and will delete all comments associated with this post.
          </DialogContentText>
          <Button type="submit" variant="contained" size="small" color="error" startIcon={<DeleteIcon />} sx={{ marginRight: "1vw" }} onClick={handleDelete}>Confirm</Button>
          <Button type="button" variant="outlined" size="small" onClick={() => setOpen(false)}>Cancel</Button>
        </DialogContent>
      </Dialog>

      <Stack spacing={2} alignItems="center">
        <Box sx={{ height: "1vh" }}/>

        <Card variant="outlined" sx={{ width: "98%" }}>
          {mainContent()}
        </Card>

        <CommentInput childTracker={childTracker} setChildTracker={setChildTracker} discussionid={threadData.id}/>

        <Stack spacing={1} alignItems="center" sx={{ width: "100%", paddingBottom: "10px" }}>
          {commentList.map((comment: Reply, i: number) => {
            return (<CommentCard key={i} comment={comment} childTracker={childTracker} setChildTracker={setChildTracker}/>);
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}