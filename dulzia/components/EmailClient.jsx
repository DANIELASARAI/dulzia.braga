import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button, Grid } from "@mui/material";
import AppTextField from "./flexbox/input-fields/AppTextField";
import { Box } from "@mui/system";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";

export const EmailClient = ({ values }) => {
  const { name, email, phone, nif, address, city, country } = values;
  const { totalPrice, totalQuantities, cartItems } = useStateContext();
  const item = cartItems.map((item) => item.name);
  const [submit, setSubmit] = useState(true);

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
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setSubmit(false);
          toast.success(`Orden tomada, verifique suo email!`);
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Box py={2}>
      {submit && (
        <Button
          onClick={sendEmail}
          //disabled={!sendEmail.result ? true : false}
          type="submit"
          variant="contained"
        >
          Fazer o pedido
        </Button>
      )}
    </Box>
  );
};
