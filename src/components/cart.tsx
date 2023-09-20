import { useCartContext } from "../context/CartContext";
import CartItem from "../components/cartItem";
import productItems from "../data/products.json";

import { Offcanvas, Stack } from "react-bootstrap";

type CartProps = {
  isOpen: boolean;
};

function Cart({ isOpen }: CartProps) {
  const { closeCart, cartItems } = useCartContext();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
          <div className="fw-bold fs-5 text-dark">
            Total Price :{" "}
            {cartItems.reduce((total, currItem) => {
              const product = productItems.find(
                (item) => item.id === currItem.id
              );
              return total + (product?.price || 0) * currItem.qty;
            }, 0)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Cart;
