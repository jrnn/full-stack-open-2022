import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import React from "react"

export const WaitForMe = () => (
  <Box sx={{
    paddingBottom: "10em",
    paddingTop: "10em"
  }}>
    <LinearProgress />
  </Box>
)
