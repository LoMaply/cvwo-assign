import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Discussion } from "../utils/Types";

export default function ThreadList({list} : {list: Array<Discussion>}) {

  const navigate = useNavigate();
  const newThread = () => {
    navigate(`/submit`);
  };

  // Generate custom thread url and forwards thread data to ViewThread page.
  const viewThread = (item: Discussion) => {
    const urlBack = item.title.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(" ").splice(0, 9).join("_");
    navigate(`/thread/${item.username}/${urlBack}`, {state:{discussion: item}});
  };

  return (
    <Stack spacing={1} alignItems="center">
      <Box />
      <Card variant="outlined" sx={{ width: "98%", height: "4vh", alignContent: "center", color: "gray" }}>
        <CardActionArea onClick={newThread}>
          <Typography sx={{ paddingLeft: "14px", paddingTop: "4px" }}>
            Create Post
          </Typography>
        </CardActionArea>
      </Card>
      {list.map((item:Discussion, i) => (
        <Card key={i} variant="outlined" sx={{ width: "98%", maxHeight: "30vh" }}>
          <CardActionArea onClick={() => viewThread(item)}>
            <CardContent>
              <Typography variant="subtitle2">
                Posted by {item.username}
              </Typography>
              <Typography gutterBottom variant="h6">
                {item.title}
              </Typography>
              <Typography variant="body1">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <Box sx={{ height: "10vh" }} />
      <Typography variant="h5">
        Looks like there are no more posts!
      </Typography>
    </Stack>
  )
}