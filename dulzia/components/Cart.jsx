import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecionando...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  /* const handleMultibanco = async () => {
    const stripe = await getStripe();
    try {
      const result = await stripe.createSource({
        type: "multibanco",
        amount: 1996,
        currency: "eur",
        owner: {
          name: "Jenny Rosen",
          email: "jenny.rosen@example.com",
        },
        redirect: {
          return_url: `${req.headers.origin}/pagamento`,
        },
      });

      if (
        result &&
        result.source &&
        result.source.multibanco &&
        result.source.multibanco.reference
      ) {
        console.log("Create source for: ", result);

        if (response.status == "success") {
          return;
        }

        setErrorMessage(
          "Ocorreu um erro. Verifique os dados e tente novamente."
        );
      }
    } catch (e) {
      setErrorMessage("Ocorreu um erro. Verifique os dados e tente novamente.");
    }
  }; */

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Seu carrinho</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>O seu saco de compras est?? vazio.</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continuar comprando
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img
                src={urlFor(item?.image[0])}
                className="cart-product-image"
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span
                        className="minus"
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num">{item.quantity}</span>
                      <span
                        className="plus"
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <br></br>
            <br></br>
            <div className="total">
              <br></br>
              <br></br>
              <h3>Total:</h3>

              <h3>??? {totalPrice}</h3>
            </div>
            <h6>
              Se pretender faturar com NIF, clique em: Estou comprando como
              empresa, no pago com Cart??o.
            </h6>

            <div className="btn-container">
              {/*       <button
                type="button"
                className="btn-multibanco"
                onClick={handleMultibanco}
              >
                Multibanco
              </button>
              <button type="button" className="btn-mbway" onClick={handleMBway}>
                MB Way
              </button> */}

              <Link href="/billing">
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="btn-iban"
                >
                  Iban
                </button>
              </Link>
              <button type="button" className="btn" onClick={handleCheckout}>
                Cart??o
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
