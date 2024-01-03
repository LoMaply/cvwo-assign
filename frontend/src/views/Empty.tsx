import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

/**
 * Catch-all page for all invalid paths.
 */
export default function Empty({ color }: { color: "primary" }) {

  const navigate = useNavigate();

  return (
    <Paper elevation={10} sx={{ width: "75%", minHeight: "90vh", bgcolor: `${color}.light`}}>
      <Stack alignItems="center">
        <Box height="40vh" />
        <Typography variant="h3" gutterBottom>
          Page not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Return to main page
        </Button>
      </Stack>
    </Paper>
  );
}