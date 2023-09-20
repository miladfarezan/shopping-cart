import { ReactNode, createContext, useContext, useState } from "react";

import Cart from "../components/cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: ReactNode;
};
type CartContext = {
  getItemQty: (id: number) => number;
  addItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  cartQty: number;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
};

type CartItem = {
  qty: number;
  id: number;
};

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0);

  function getItemQty(id: number) {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  }
  function addItem(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, qty: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItem(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.qty == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeItem(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQty,
        addItem,
        decreaseItem,
        removeItem,
        cartQty,
        openCart,
        closeCart,
        cartItems,
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </CartContext.Provider>
  );
}
