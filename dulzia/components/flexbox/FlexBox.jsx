import { Box } from "@mui/material";
import React from "react";

const FlexBox = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);

export default FlexBox;
