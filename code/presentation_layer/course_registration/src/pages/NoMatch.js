import React from "react";

// MUI
import { Box, Typography } from "@mui/material";

function NoMatch() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#d7ccc8" }}
        >
            <Typography variant="h3">
                INVALID URL
            </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default NoMatch;
