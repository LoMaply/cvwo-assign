import "../styles/Home.css";

import { Box, Button, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ThreadList from "../components/ThreadList";
import { axiosinstance } from "../utils/AxiosInstance";
import { Discussion, ResponseObject } from "../utils/Types";
import { useNavigate } from "react-router-dom";
import categories from "../utils/CategoryOptions";

function Home({ color }: { color: "primary" }) {
  const [threads, setThreads] = useState<Array<Discussion>>([]);
  const [visible, setVisible] = useState<Array<Discussion>>([]);

  const navigate = useNavigate();
  const newThread = () => {
    navigate(`/submit`);
  };

  // Get list of discussions from backend
  useEffect(() => {
    axiosinstance.get(`/api/discussions`)
    .then(response => {
      const discussionList: Array<Discussion> = response.data.data.map((thread:ResponseObject) => (thread.attributes as Discussion));
      setThreads(discussionList);
      setVisible(discussionList);
      console.log(response.data.data);
    }).catch(response => console.log(response))
  }, []);


  // Updates list of visible threads based on selected category
  const setVisibleList = (category:string) => {
    if (category == "All") {
      setVisible(threads);
    } else {
      setVisible(threads.filter((item:Discussion) => (item.category == category)));
    }
  };

  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light`}}>
      <Box />
      <Paper variant="outlined" sx={{ height: "6vh", marginBottom: "1vh" }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ height: "100%" }}>
          <Button variant="contained" size="medium" sx={{ width: "12%", borderRadius: "10px" }} onClick={newThread}>
            Create
          </Button>
          <TextField 
            size="small" 
            sx={{ width: "70%" }} 
            label="Search" 
          />
          <Select 
            size="small" 
            defaultValue="All"
            onChange={(event: SelectChangeEvent) => setVisibleList(event.target.value)}
            sx={{ width: "15%" }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {categories.map((item, i) => (<MenuItem value={item} key={i}>{item}</MenuItem>))}
          </Select>
        </Stack>
      </Paper>
      <ThreadList list={visible} />
    </Paper>
  );
}

export default Home;
