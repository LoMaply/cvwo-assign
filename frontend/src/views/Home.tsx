import "../styles/Home.css";

import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ThreadList from "../components/ThreadList";
import { axiosinstance } from "../utils/AxiosInstance";
import categories from "../utils/CategoryOptions";
import { Discussion, ResponseObject } from "../utils/Types";

/**
 * Main page displaying list of threads. List can be filtered/searched.
 */
function Home({ color }: { color: "primary" }) {
  
  const [threads, setThreads] = useState<Array<Discussion>>([]);
  const [visible, setVisible] = useState<Array<Discussion>>([]);
  // Search bar
  const [search, setSearch] = useState<string>("");
  // Menu options
  const [sort, setSort] = useState<string>("Newest");
  const [category, setCategory] = useState<string>("All");


  const navigate = useNavigate();
  const newThread = () => {
    navigate(`/create`);
  }

  // Search for threads based on search bar input
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getThreads(search);
  }

  // Get list of discussions from backend
  useEffect(() => {
    getThreads("");
  }, []);

  // Update visible list based on selected menu options
  useEffect(() => {
    setVisibleThreads();
  }, [sort, category]);

  const getThreads = async (query: string) => {
    let url = `/api/discussions`;
    if (query) {
      url += `?query=${query.trim()}`;
    }
    await axiosinstance.get(url)
    .then(response => {
      const discussionList: Array<Discussion> = response.data.data.map((thread:ResponseObject) => (thread.attributes as Discussion));
      setThreads(discussionList);
      setVisible(discussionList.sort((a:Discussion, b:Discussion) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime())));
      console.log(response.data.data);
    })
    .catch(response => console.log(response));
  }

  const setVisibleThreads = () => {
    let listToDisplay: Array<Discussion> = threads;

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
  }

  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light` }}>
      <Paper variant="outlined" sx={{ height: "6vh", marginBottom: "1vh" }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ height: "100%", marginLeft: "0.5%", marginRight: "0.5%" }}>
          <Button variant="contained" size="medium" sx={{ maxWidth: "11vw", borderRadius: "10px" }} startIcon={<CreateIcon />} onClick={newThread}>
            Create
          </Button>

          <FormControl variant="outlined" size="small" component="form" sx={{ flexGrow: 1 }} onSubmit={handleSubmit} >
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
            defaultValue="Newest"
            onChange={(event: SelectChangeEvent) => setSort(event.target.value)}
            sx={{ width: "10vw" }}
          >
            <MenuItem value={"Newest"}>Newest</MenuItem>
            <MenuItem value={"Oldest"}>Oldest</MenuItem>
          </Select>

          <Select 
            size="small"
            defaultValue="All"
            onChange={(event: SelectChangeEvent) => setCategory(event.target.value)}
            sx={{ width: "10vw" }}
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
