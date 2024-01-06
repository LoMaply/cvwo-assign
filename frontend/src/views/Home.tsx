import "../styles/Home.css";

import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ThreadList from "../components/ThreadList";
import { axiosinstance } from "../utils/AxiosInstance";
import categories from "../utils/CategoryOptions";
import { Discussion, ResponseObject } from "../utils/Types";

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Clear } from "@mui/icons-material";

/**
 * Main page displaying list of threads. List can be filtered/searched.
 */
function Home({ color }: { color: "primary" }) {
  
  const [threads, setThreads] = useState<Array<Discussion>>([]);
  const [visible, setVisible] = useState<Array<Discussion>>([]);

  const [search, setSearch] = useState<string>("");


  const navigate = useNavigate();
  const newThread = () => {
    navigate(`/submit`);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getThreads(search);
  }

  // Get list of discussions from backend
  useEffect(() => {
    getThreads("");
  }, []);

  const getThreads = async (query: string) => {
    let url = `/api/discussions`;
    if (query) {
      url += `?query=${query}`;
    }
    axiosinstance.get(url)
    .then(response => {
      const discussionList: Array<Discussion> = response.data.data.map((thread:ResponseObject) => (thread.attributes as Discussion));
      setThreads(discussionList);
      setVisible(discussionList);
      console.log(response.data.data);
    })
    .catch(response => console.log(response));
  }

  // Updates list of visible threads based on selected category
  const setVisibleList = (category:string) => {
    if (category == "All") {
      setVisible(threads);
    } else {
      setVisible(threads.filter((item:Discussion) => (item.category == category)));
    }
  }

  const resetAdornment = search == ""
    ? <></>
    : (
      <InputAdornment position="end">
        <IconButton type="reset" edge="end" onClick={() => {setSearch(""); getThreads("");}}>
          <ClearIcon />
        </IconButton>
      </InputAdornment>
    )

  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light` }}>
      <Paper variant="outlined" sx={{ height: "6vh", marginBottom: "1vh" }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ height: "100%", marginLeft: "2px" }}>
          <Button variant="contained" size="medium" sx={{ width: "12%", borderRadius: "10px" }} onClick={newThread}>
            Create
          </Button>

          <FormControl variant="outlined" size="small" sx={{ width: "70%" }} component="form" onSubmit={handleSubmit} >
            <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
            <OutlinedInput 
              id="outlined-adornment-search"
              label="Search"
              onChange={e => setSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton type="submit" edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="reset" edge="end" onClick={() => {setSearch(""); getThreads("");}}>
                      <ClearIcon/>
                    </IconButton>
                  </InputAdornment>
              }
            />
          </FormControl>

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
