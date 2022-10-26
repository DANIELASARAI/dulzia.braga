import { Box, Card, IconButton } from "@mui/material";
import FlexBox from "../components/flexbox/FlexBox";
import { H6, Paragraph } from "../components/Typography";
import CheckmarkCircle from "../icons/CheckmarkCircle";
import City from "../icons/City";
import Delete from "../icons/Delete";
import React from "react"; // -----------------------------------------------------

// -----------------------------------------------------
const BillingAddressCard = ({ selectedValue, values }) => {
  return (
    <Card
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: selectedValue ? "1px solid" : 0,
        borderColor: "primary.main",
      }}
    >
      <Box>
        <FlexBox alignItems="center" gap={1} mb={1}>
          <City
            sx={{
              color: "text.disabled",
            }}
          />
          <H6 fontSize={12}>{selectedValue}</H6>
        </FlexBox>

        <Paragraph className="addressCard">
          {values.name} <br />
          <span>{values.phone}</span> <br />
          {values.address}, {values.city} <br />
          <span className="email">{values.email}</span>
          <br />
          {values.country} <br />
          NIF: {values.nif >= 1 ? values.nif : "N / A"}
        </Paragraph>
      </Box>

      {/*  {selected ? (
        <Box padding={1}>
          <CheckmarkCircle
            sx={{
              color: "primary.main",
            }}
          />
        </Box>
      ) : (
        <IconButton>
          <Delete
            sx={{
              color: "text.disabled",
            }}
          />
        </IconButton>
      )} */}
    </Card>
  );
};

export default BillingAddressCard;
