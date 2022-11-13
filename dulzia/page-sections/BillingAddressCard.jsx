import { Box, Button, Card, IconButton } from "@mui/material";
import FlexBox from "../components/flexbox/FlexBox";
import { H6, Paragraph } from "../components/Typography";
import CheckmarkCircle from "../icons/CheckmarkCircle";
import City from "../icons/City";
import Delete from "../icons/Delete";
import React from "react"; // -----------------------------------------------------
import { DeleteForever } from "@mui/icons-material";

// -----------------------------------------------------
const BillingAddressCard = ({ selectedValue, values, setValues }) => {
  return (
    <>
      {values && (
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
            </FlexBox>

            <Paragraph className="addressCard">
              {values.name} <br />
              <span>{values.phone}</span> <br />
              {values.address} <br />
              {values.city} {values.postal} <br />
              <span className="email">{values.email}</span>
              <br />
              {values.country} <br />
              NIF: {values.nif >= 1 ? values.nif : "N / A"}
            </Paragraph>
          </Box>
        </Card>
      )}
    </>
  );
};

export default BillingAddressCard;
