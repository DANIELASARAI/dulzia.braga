import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button, Grid } from "@mui/material";
import AppTextField from "./flexbox/input-fields/AppTextField";
import { Box } from "@mui/system";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

export const EmailClient = ({ values }) => {
  const { name, email, phone, nif, address, city, country } = values;
  const { totalPrice, totalQuantities, cartItems } = useStateContext();
  const item = cartItems.map((item) => item.name);
  console.log(item);
  console.log(cartItems);
  const sendEmail = (e) => {
    e.preventDefault();
    let templateParams = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      nif: nif,
      country: country,
      address: address,
      message: "Tem um novo pedido de compra con os seguintes detalhes",
      total: totalPrice,
      quantity: totalQuantities,
      items: item,
    };
    emailjs
      .send(
        "gmailMessage",
        "template_uufc0e1",
        templateParams,

        "t4yHeDqUjbcehttwu"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Box py={2}>
      <Button onClick={sendEmail} type="submit" variant="contained">
        Fazer o pedido
      </Button>
    </Box>
  );
};
