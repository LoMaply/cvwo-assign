import { Box, Card, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import ProfileOptions from "../components/ProfileOptions";
import ProfilePosts from "../components/ProfilePosts";
import { Discussion, ResponseObject, User } from "../utils/Types";
import AuthContext from "../context/AuthContext";
import { axiosinstance } from "../utils/AxiosInstance";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, marginLeft: "-10px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/**
 * Profile page displaying profile options and posts created by the current logged in user.
 */
export default function Profile({ color }: { color: "primary" }) {
  // Page tabs
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  // Get threads created by the user for Poststtab
  const { user } = useContext(AuthContext) as { user: User };
  const [threads, setThreads] = useState<Array<Discussion>>([]);

  // Get list of discussions from backend
  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    axiosinstance.get(`/api/discussions?user=${user.id}`)
    .then(response => {
      const discussionList: Array<Discussion> = response.data.data.map((thread:ResponseObject) => (thread.attributes as Discussion));
      setThreads(discussionList);
      console.log(response.data.data);
    })
    .catch(response => console.log(response));
  }

  

  return (
    <Paper elevation={10} sx={{ width: "75%", height: "90vh", bgcolor: `${color}.light`}}>
      <Stack spacing={1} alignItems="center" sx={{ height: "100%" }}>
        <Box />
        <Card variant="outlined" sx={{ width: "98%" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Options" {...a11yProps(0)} />
            <Tab label="Posts" {...a11yProps(1)} />
          </Tabs>
        </Card>

        <Card variant="outlined" sx={{ width: "98%", height: "90%", alignItems: "flex-start" }}>
          <CustomTabPanel value={value} index={0}>
            <ProfileOptions />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ProfilePosts list={threads}/>
          </CustomTabPanel>
        </Card>
      </Stack>
    </Paper>
  );
}