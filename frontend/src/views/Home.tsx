import { useState, useEffect } from 'react';
import { Discussion, ResponseObject } from '../utils/Types';
import axios from '../utils/AxiosInstance';

function Home() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    axios.get('/discussions')
    .then( response => {
      setThreads(response.data.data)
      console.log(response.data.data)
    }).catch(response => console.log(response))
  }, []);


  return (
    <div>
      <ul>
        {threads.map((thread:ResponseObject, i) => (
          <li key={i}>{(thread.attributes as Discussion).title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
