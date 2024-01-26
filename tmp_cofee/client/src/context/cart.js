import { useState, useContext, createContext,useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart,setCart]=useState([])

///we save our product in cart as a local storage but it is not shown in real time  so we use useeffect
 useEffect(()=>{
  let existingCartItem=localStorage.getItem('cart');
  if(existingCartItem)setCart(JSON.parse(existingCartItem))

 },[])


  return (
    <CartContext.Provider value={[cart,setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };