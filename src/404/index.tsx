import React, { useEffect, useState } from "react";
import "./404.css";
import { Box, Container, Typography } from "@mui/material";

export const NotFound = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="75vh"
      >
        <Typography variant="h4" className={animate ? "fadeText" : ""}>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" className={animate ? "fadeText" : ""}>
          {"The page you are looking for doesn't exist."}
        </Typography>
      </Box>
    </Container>
  );
};
