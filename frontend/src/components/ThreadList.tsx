import { Button, Stack, Card, CardContent, Typography, CardActionArea, Box, TextField } from "@mui/material";

import { Discussion } from "../utils/Types";
import { useNavigate } from "react-router-dom";

export default function ThreadList({list} : {list: Array<Discussion>}) {

  const navigate = useNavigate();
  const newThread = () => {
    navigate(`/submit`);
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Box />
      <Button variant="text" onClick={newThread} sx={{ width: "99%", border: "1px solid lightgray", justifyContent: "flex-start", color: "gray" }}>Create Post</Button>

      {list.map((item:Discussion, i) => (
        <Card key={i} variant="outlined" sx={{ width: "99%", maxHeight: "20%" }}>
          <CardActionArea>
            <CardContent>
              <Typography variant="subtitle2">
                Posted by [Name placeholder]
              </Typography>
              <Typography gutterBottom variant="h6">
                {item.title}
              </Typography>
              <Typography variant="body1" textOverflow="true">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <Box sx={{ height: "100px" }} />
      <Typography variant="h5">
        Looks like there are no more posts!
      </Typography>
    </Stack>
  )
}