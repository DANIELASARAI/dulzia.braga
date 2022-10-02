//1 import the things we need to implement the logic
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

//2 Create the context and call it as a hook
const Context = createContext();

//3 Below, create the context functional component * StateContent *  pass it the children and render it out below (5.) in return of the function

export const StateContext = ({ children }) => {
  //4 Create the states
  //4.1 to show or hide the cart
  const [showCart, setShowCart] = useState(false);
  /*  4.2 to know what items do we have in our car, at start is an empty array, 
 then fill it with data coming from local storage, if user exits the page, it will remain */
  const [cartItems, setCartItems] = useState([]);
  //4.3 keep track of the total price
  const [totalPrice, setTotalPrice] = useState(0);
  //4.4 to know the quantities of all items we work with
  const [totalQuantities, setTotalQuantities] = useState(0);
  //4.5  qty is set to 1 beacause we can change the quantity for each individual item
  const [qty, setQty] = useState(1);

  /* 8. Add functionalities for our product page> incremet, decrement, add or remove items to the cart.
    Instead of passing set quantity function to all of our components,
    we create a dynamic update functions inside of our StateContext 
    to provide the final function to our product details component.*/

  let foundProduct;
  let index;

  /* 8.3  To add items to our cart, the function accepts 2 parameters, the product and the quantity we want to add */
  const onAdd = (product, quantity) => {
    /* a) Check if the product we want to add is already in the cart, using cartItems state and the find method.
     loop over all the cart items, and check for individual item if item.?id is equal to the product._id. 
     If that is the case, we simply increase the quantity and not adding an instance of the same item. */
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      //b.1 we find the product( if chekProductInCart is true ),
      //in this case, we increase the total price => previous prices plus the product price times the quantity we set
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    //b.2 Do the same with quantities. We are passing quantity as a prop.
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    /* b)  If that is the case, we simply increase the quantity and not adding an instance of the same item */
    if (checkProductInCart) {
      /* c) We update the cart by mapping over the current cart items. 
      If cart product is equal to the product we try to add. 
      If this is the case, we return a new object with spreaded cart product. 
      Updating th item quantity with the new quantity we want to add.
      Not Duplicating the items inside the cart component.*/
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
      /* d) If the item does not exist in the cart, update the product quantity to the new quantity we want to add. Finnaly, pass this function to the values inside the context below, 
      and go to product page and use it. on Add to Cart button. */
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} adicionado ao carrinho!`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === "inc") {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems((prev) =>
          prev.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          })
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  /* 8.1  When ever we update the state using the previous version prevQty of that same state, we use this prev version plus 1. */
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  /* 8.2  Same as incQty, but we check if lower than 1, because we cant be lower than 1 */
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  /* 5. Create the context provider by specifying a return statement, not rendering but wrapping everything with the context provider.
   we pass the children inside. And pass some values to it: states fields. */
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//6. Go to _app file and import the StateContext file and wrap the Layout with it

//7.Allows us to use the state like a hook, go first to product/slug
export const useStateContext = () => useContext(Context);
