import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Discussion } from "../utils/Types";

/**
 * Component for displaying threads in main page.
 * @param list Filtered list of threads to be displayed.
 */
export default function ThreadList({list} : {list: Array<Discussion>}) {

  const navigate = useNavigate();

  // Generate custom thread url and forwards thread data to ViewThread page.
  const viewThread = (item: Discussion) => {
    const urlBack = item.title.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(" ").splice(0, 9).join("_");
    navigate(`/thread/${item.username}/${urlBack}`, {state:{discussionid: item.id}});
  };

  return (
    <Stack spacing={1} alignItems="center">
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
              <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
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