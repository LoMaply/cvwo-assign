import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  
  const navigate = useNavigate();
  const mainPage = () => {
    navigate(`/`);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ md: 'flex', mr: 1, cursor: "pointer" }} onClick={mainPage}>
            Forum
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{ flexGrow: 0 }} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}