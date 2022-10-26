import {
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import FlexBetween from "../components/flexbox/FlexBetween";
import FlexBox from "../components/flexbox/FlexBox";
import { H5, H6 } from "../components/Typography";
import Edit from "../icons/Edit";
import ShoppingCart from "../icons/ShoppingCart";
import { useStateContext } from "../context/StateContext";
import React from "react"; // ---------------------------------------------------------------------
import Link from "next/link";

// ---------------------------------------------------------------------

const OrderSummery = ({ showCoupon, showEditBtn, buttonText, handleClick }) => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();
  return (
    <Card
      sx={{
        padding: 3,
      }}
    >
      <FlexBetween mb={4}>
        <H5>Seu pedido</H5>
        {showEditBtn && (
          <IconButton>
            <Edit
              sx={{
                fontSize: 16,
                color: "text.disabled",
              }}
            />
          </IconButton>
        )}
      </FlexBetween>

      <Stack spacing={1.5} mb={4}>
        <ListItem title="Produtos" value={cartItems.length} />
        <ListItem title="Total de ítens" value={totalQuantities} />

        <Divider />
        <ListItem
          title="Total a pagar"
          value={"€" + totalPrice}
          valueColor="error.main"
        />
      </Stack>

      {showCoupon && (
        <FlexBox alignItems="center" gap={1} mb={3}>
          <TextField
            color="grey"
            placeholder="Apply Coupon"
            size="small"
            fullWidth
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              padding: 1,
            }}
          >
            Apply
          </Button>
        </FlexBox>
      )}
      <Link href="/pagamento">
        <Button variant="contained" startIcon={<ShoppingCart />} fullWidth>
          Pagamento
        </Button>
      </Link>
    </Card>
  );
};

export default OrderSummery; // -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
function ListItem({ title, value, valueColor }) {
  return (
    <FlexBetween>
      <H6 fontWeight={500}>{title}</H6>
      <H6 fontWeight={500} color={valueColor}>
        {value}
      </H6>
    </FlexBetween>
  );
}
