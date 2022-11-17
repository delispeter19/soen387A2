import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header";
import MainAlerts from "../../components/layout/MainAlerts";

// MUI
import { Box } from "@mui/material";

function Home(props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header home={props.home} />
        <MainAlerts />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#d7ccc8" }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
