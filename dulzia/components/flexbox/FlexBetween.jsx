import { Box } from "@mui/material";
import React from "react";

const FlexBetween = ({ children, ...props }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    {...props}
  >
    {children}
  </Box>
);

export default FlexBetween;
