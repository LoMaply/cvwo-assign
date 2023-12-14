import { Box, Card, CardContent, CardHeader, Paper, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import CommentList from "../components/CommentList";
import { Discussion } from "../utils/Types";


export default function ViewThread({ color }: { color: "primary" }) {

  // Get data of currently viewed thread from clicked Card in ThreadList.tsx
  const location = useLocation()
  const threadData: Discussion = location.state.discussion;
  console.log(threadData)

  
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
        </Card>

        <CommentList />
      </Stack>
    </Paper>
  )
}