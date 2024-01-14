import { useNavigate } from "react-router-dom";
import { Discussion } from "../utils/Types";
import { Card, CardActionArea, CardContent, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

/**
 * Tab in Profile page displaying history of posts created by current logged in user.
 */
export default function ProfilePosts({list} : {list: Array<Discussion>}) {

  // Pagination
  const max = Math.ceil(list.length / 5);
  const [page, setPage] = useState(1);
  const pageList: Array<Discussion> = list.slice((page - 1) * 5, page * 5);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  // Generate custom thread url and forwards thread data to ViewThread page.
  const navigate = useNavigate();

  const viewThread = (item: Discussion) => {
    const urlBack = item.title.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(" ").splice(0, 9).join("_");
    navigate(`/thread/${item.username}/${urlBack}`, {state:{discussionid: item.id}});
  };


  return (
      <Stack spacing={1} alignItems="center">
        <Pagination count={max} page={page} onChange={handleChange} />
        {pageList.map((item, i) => (
            <Card key={i} sx={{  width: "98%", height: "13vh" }}>
              <CardActionArea onClick={() => viewThread(item)} sx={{ height: "14vh" }}>
                <CardContent sx={{ height: "14vh" }}>
                  <Typography variant="h6">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" style={{ whiteSpace: "pre-wrap", textOverflow: "ellipsis" }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        )}
      </Stack>
  )
}