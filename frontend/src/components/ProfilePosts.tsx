import { useNavigate } from "react-router-dom";
import { Discussion } from "../utils/Types";
import { Box, Card, CardActionArea, CardContent, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import categories from "../utils/CategoryOptions";

/**
 * Tab in Profile page displaying history of posts created by current logged in user.
 */
export default function ProfilePosts({list} : {list: Array<Discussion>}) {
  const [visible, setVisible] = useState<Array<Discussion>>(list.sort((a:Discussion, b:Discussion) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime())));

  // Menu options
  const [sort, setSort] = useState<string>("Newest");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    let listToDisplay: Array<Discussion> = list;
    if (category != "All") {
      listToDisplay = listToDisplay.filter((item:Discussion) => (item.category == category));
    } else {
      listToDisplay = listToDisplay.map((item:Discussion) => (item));
    }
    if (sort == "Newest") {
      setVisible(listToDisplay.sort((a:Discussion, b:Discussion) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime())));
    } else {
      setVisible(listToDisplay.sort((a:Discussion, b:Discussion) => (new Date(a.created_at).getTime() - new Date(b.created_at).getTime())));
    }
  }, [sort, category])

  // Pagination
  const max = Math.ceil(list.length / 5);
  const [page, setPage] = useState(1);
  const pageList: Array<Discussion> = visible.slice((page - 1) * 5, page * 5);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  // Generate custom thread url and forwards thread data to ViewThread page.
  const navigate = useNavigate();

  const viewThread = (item: Discussion) => {
    const urlBack = item.title.toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').split(" ").splice(0, 9).join("_");
    navigate(`/thread/${item.id}/${urlBack}`);
  };


  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" alignItems="center" justifyContent="center" height="100%" width="100%">
        <Select
          size="small"
          defaultValue="Newest"
          onChange={(event: SelectChangeEvent) => setSort(event.target.value)}
          sx={{ width: "15%" }}
        >
          <MenuItem value={"Newest"}>Newest</MenuItem>
          <MenuItem value={"Oldest"}>Oldest</MenuItem>
        </Select>
        <Pagination count={max} page={page} onChange={handleChange} />
        <Select 
          size="small" 
          defaultValue="All"
          onChange={(event: SelectChangeEvent) => setCategory(event.target.value)}
          sx={{ width: "15%" }}
        >
          <MenuItem value={"All"}>All</MenuItem>
          {categories.map((item, i) => (<MenuItem value={item} key={i}>{item}</MenuItem>))}
        </Select>
      </Stack>

      {pageList.map((item, i) => (
        <Card key={i} sx={{  width: "98%", height: "13vh" }}>
          <CardActionArea onClick={() => viewThread(item)} sx={{ height: "13vh" }}>
            <CardContent>
              <Stack height="13vh">
                <Typography variant="subtitle2">
                  Posted {formatDistanceToNowStrict(new Date(item.created_at))} ago
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.title}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
        )
      )}
    </Stack>
  )
}