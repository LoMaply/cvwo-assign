import "../styles/Home.css";

import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

import ThreadList from "../components/ThreadList";
import axios from "../utils/AxiosInstance";
import { Discussion, ResponseObject } from "../utils/Types";

function Home() {
  const [threads, setThreads] = useState<Array<Discussion>>([]);

  // Get list of discussions
  useEffect(() => {
    axios.get('/discussions')
    .then( response => {
      setThreads(response.data.data.map((thread:ResponseObject) => (thread.attributes as Discussion)))
      console.log(response)
      console.log(response.data.data)
    }).catch(response => console.log(response))
  }, []);


  return (
    <Paper elevation={10} sx={{ width: "75%" }} style={{minHeight: "90vh" }} >
      <ThreadList list={threads} />
    </Paper>
  );
}

export default Home;
