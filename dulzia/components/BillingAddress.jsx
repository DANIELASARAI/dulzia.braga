import React, { useEffect } from "react";
import { Button, Grid, RadioGroup, Stack, styled } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/system";
import AppCheckBox from "./AppCheckBox";
import AppModal from "./AppModal";
import AppRadio from "./AppRadio";
import FlexBetween from "./flexbox/FlexBetween";
import FlexBox from "./flexbox/FlexBox";
import AppTextField from "./flexbox/input-fields/AppTextField";
import { H5, H6, Small } from "./Typography";
import Add from "../icons/Add";
import ChevronLeft from "../icons/ChevronLeft";
import Shopping from "../icons/Shopping";
import BillingAddressCard from "../page-sections/BillingAddressCard";
import Heading from "../page-sections/Heading";
import OrderSummery from "../page-sections/OrderSummery";
import Stepper from "../page-sections/Stepper";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { EmailClient } from "./EmailClient";
import { Remove } from "@mui/icons-material";
import Delete from "../icons/Delete";

//import { useNavigate } from "react-router-dom"; //  styled components

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  "& .MuiTypography-root": {
    fontSize: 12,
    fontWeight: 600,
  },
}));

const BillingAddress = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Nif");

  const [values, setValues] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const changeHandler = (ev) => {
    console.log(ev.target.value);
    localStorage.setItem(ev.target.name, ev.target.value);
  };

  const handleSubmit = (e) => {
    setValues(localStorage);
    setOpenModal(false);
  };
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Heading title="Checkout" Icon={Shopping} />
          <Box mt={3} maxWidth={700}>
            <Stepper stepNo={1} />
          </Box>
        </Grid>

        <Grid item md={8} xs={12}>
          <FlexBetween flexWrap="wrap" gap={1.5} mb={3}>
            <H5>Faturamento e endereço</H5>
            {values && (
              <Delete cursor="pointer" onClick={() => setValues("")} />
            )}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenModal(true)}
            >
              Adicionar endereço
            </Button>
          </FlexBetween>
          <h5>
            Preencha os dados de endereço e clique em fazer pedido antes do
            pagamento.
          </h5>

          <AppModal open={openModal} handleClose={() => setOpenModal(false)}>
            <H5> Adicionar endereço</H5>

            <Box py={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <RadioGroup row value={selectedValue} onChange={handleChange}>
                    <StyledFormControlLabel
                      value="Nif"
                      control={<AppRadio />}
                      label="Preciso Nif"
                    />
                    <StyledFormControlLabel
                      value=""
                      control={<AppRadio />}
                      label="Não preciso Nif"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    required
                    size="small"
                    label="Nome"
                    name="name"
                    autoFocus
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    required
                    size="small"
                    label="Email"
                    name="email"
                    autoFocus
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="Phone"
                    name="phone"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="Còdigo Postal"
                    name="postal"
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    name="address"
                    label="Address"
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="City"
                    name="city"
                    onChange={changeHandler}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <AppTextField
                    fullWidth
                    size="small"
                    required
                    label="Country"
                    name="country"
                    onChange={changeHandler}
                  />
                </Grid>
                {selectedValue === "Nif" ? (
                  <Grid item sm={6} xs={12}>
                    <AppTextField
                      fullWidth
                      size="small"
                      required
                      label="Nif"
                      name="nif"
                      onChange={changeHandler}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Box>

            <FlexBox alignItems="center" justifyContent="end" gap={1} mt={1}>
              <Button
                variant="GreyOutlined"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Enviar a esta Direçao
              </Button>
            </FlexBox>
          </AppModal>

          <Stack gap={2}>
            <BillingAddressCard selectedValue={selectedValue} values={values} />
          </Stack>

          <Box mt={2}>
            <EmailClient values={values} />
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <OrderSummery
            values={values}
            submit={handleSubmit}
            buttonText="Payment"
            /*  handleClick={() => navigate("/dashboards/payment")} */
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillingAddress;
