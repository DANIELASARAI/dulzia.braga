import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  styled,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Send } from "@mui/icons-material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import FlexBetween from "../components/flexbox/FlexBetween";
import { H3, H5, H6, Small, Span, Tiny } from "../components/Typography";
import DownloadTo from "../icons/DownloadTo";
import Link from "next/link";
import { lightTheme } from "../constants";
import { useStateContext } from "../context/StateContext";
import Stepper from "../page-sections/Stepper";
import emailjs from "@emailjs/browser";

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  padding: 0,
  fontSize: 12,
  fontWeight: 600,
  paddingBottom: 5,
  color: theme.palette.text.secondary,
  borderBottom: `1px solid ${
    lightTheme(theme) ? theme.palette.grey[300] : theme.palette.divider
  }`,
  "&:last-of-type": {
    textAlign: "right",
  },
}));
const BodyTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  padding: "10px 0",
  "&:last-of-type": {
    textAlign: "right",
    fontWeight: 600,
  },
}));
const StyledSmall = styled(Small)(({ theme, type }) => ({
  fontSize: 12,
  color: "white",
  padding: "4px 10px",
  borderRadius: "4px",
  backgroundColor:
    type === "success"
      ? theme.palette.success.main
      : theme.palette.primary.main,
}));

const Pagamento = () => {
  const { totalPrice, totalQuantities, cartItems } = useStateContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  console.log(date);

  const { name, address, nif, phone, postal, country, city, email } =
    localStorage;
  console.log(name);

  const handleCapture = (e) => {
    setSelectedFile(e.target.value);
  };
  console.log(selectedFile);

  return (
    <Box pt={2} pb={4}>
      <Box mt={3} maxWidth={700}>
        <Stepper stepNo={2} />
      </Box>
      <Card
        sx={{
          padding: "2rem 1rem",
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={7} xs={12}>
            <FlexBetween>
              <Box width={60}>
                <img src="/static/logo/logo.svg" height="36px" alt="" />
              </Box>

              <Stack textAlign="right">
                <H3>Sua Compra</H3>
                <H6 fontSize={12}>Descriçao</H6>
              </Stack>
            </FlexBetween>

            <FlexBetween my={3}>
              <Stack spacing={0.5}>
                <H6 fontSize={12}>Enviar a:</H6>
                <H5>{name}</H5>
                <H5>NIF:{nif}</H5>
                <Tiny fontWeight={500} lineHeight={1.6}>
                  {city}, {postal} <br />
                  {address} <br />
                  {country}
                </Tiny>
              </Stack>

              <Tiny fontWeight={500} lineHeight={1.6} textAlign="right">
                R. Dom Gonçalo Pereira 55
                <br /> Tel: 966 682 542 <br /> 4700-032, Braga <br /> Portugal
              </Tiny>
            </FlexBetween>

            {/*  <H6 mb={1} color="text.secondary">
              Issue Date:{" "}
              <Span
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                }}
              >
                03/10/2018
              </Span>
            </H6> */}
            <H6 color="text.secondary">
              Data:{" "}
              <Span
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                }}
              >
                {date}
              </Span>
            </H6>

            <Table
              sx={{
                mt: 3,
              }}
            >
              <TableHead>
                <TableRow>
                  <HeadTableCell>Descrição</HeadTableCell>
                  <HeadTableCell>Quantidade</HeadTableCell>
                  <HeadTableCell>Preço</HeadTableCell>
                  <HeadTableCell>Quantia</HeadTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow>
                    <BodyTableCell>{item.name}</BodyTableCell>
                    <BodyTableCell>{item.quantity}</BodyTableCell>
                    <BodyTableCell>{item.price}</BodyTableCell>
                    <BodyTableCell>{item.price * item.quantity}</BodyTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider />

            <Stack mt={3} spacing={1} maxWidth={200} marginLeft="auto">
              <FlexBetween>
                <Tiny fontWeight={500}>Total de Itens:</Tiny>
                <H6>{totalQuantities}</H6>
              </FlexBetween>

              <FlexBetween>
                <Tiny fontWeight={500}>Total a pagar:</Tiny>
                <H6>€{totalPrice}</H6>
              </FlexBetween>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
              {/* <Button variant="outlined" startIcon={<DownloadTo />}>
                PDF
              </Button> */}
              <Button
                size="small"
                variant="outlined"
                onClick={() => window.print()}
                sx={{
                  marginRight: 2,
                }}
              >
                Imprimir dados
              </Button>
            </Stack>
          </Grid>

          <Grid item md={5} xs={12}>
            <Box
              sx={{
                padding: 3,
                height: "100%",
                borderRadius: "4px",
                backgroundColor: "action.selected",
              }}
            >
              <Stack spacing={2} direction="row" alignItems="center">
                <StyledSmall>Pendente para pagar</StyledSmall>
              </Stack>

              <Stack mt={3} spacing={2}>
                <H3 fontSize={16}>Detalhes do pagamento:</H3>

                <Tiny fontWeight={500}>
                  Enviar comprovativo a: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    dulziabraga@gmail.com
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  Iban: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    PT50.0033.0000.45658200313.05
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  Termos de pagamento: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    1-3 dias
                  </Span>
                </Tiny>
              </Stack>

              <Stack mt={3} spacing={2}>
                <H3 fontSize={16}>Resumo do Pagamento:</H3>

                <Tiny fontWeight={500}>
                  Nome: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    Detalhes Celestiais Unip LDA
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  NIF: <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    516738267
                  </Span>
                </Tiny>
                <Tiny fontWeight={500}>
                  Tempo de entrega estimado
                  <br />
                  <Span color="text.primary" fontSize={13} fontWeight={600}>
                    1 a 3 dìas uteis
                  </Span>
                </Tiny>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
        <Link href="/success">
          <Button
            type="button"
            size="small"
            variant="outlined"
            sx={{
              marginRight: 2,
            }}
          >
            Pagamento realizado
          </Button>
        </Link>
      </Stack>
    </Box>
    //Acuse a ricardo de encomienda numero para preparar producto,
    //una vez que llegue la transferencia, se realiza el envio.
  );
};

export default Pagamento;
