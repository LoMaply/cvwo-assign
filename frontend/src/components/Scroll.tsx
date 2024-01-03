import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";

/**
 * Component for instant scroll to top button.
 */
export default function ScrollToTop() {
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Optional: smooth scrolling animation
    });
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={scroll}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab variant="extended">
          Back to top
        </Fab>
      </Box>
    </Fade>
  );
}