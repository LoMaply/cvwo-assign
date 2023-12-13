import "../styles/Home.css";

import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

import ThreadList from "../components/ThreadList";
import { axiosinstance } from "../utils/AxiosInstance";
import { Discussion, ResponseObject } from "../utils/Types";

function Home() {
  const [threads, setThreads] = useState<Array<Discussion>>([]);

  // Get list of discussions
  useEffect(() => {
    axiosinstance.get(`/api/discussions`)
    .then(response => {
      setThreads(response.data.data.map((thread:ResponseObject) => (thread.attributes as Discussion)))
      console.log(threads)
    }).catch(response => console.log(response))
  }, []);


  return (
    <Paper elevation={10} sx={{ width: "75%" }} style={{minHeight: "90vh" }} >
      <ThreadList list={threads} />
    </Paper>
  );
}

export default Home;
