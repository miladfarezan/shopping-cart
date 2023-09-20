import { Stack, Button } from "react-bootstrap";

import productItems from "../data/products.json";
import { useCartContext } from "../context/CartContext";

type CartItemProps = {
  id: number;
  qty: number;
};

function CartItem({ id, qty }: CartItemProps) {
  const { removeItem } = useCartContext();
  const product = productItems.find((item) => item.id === id);

  if (product == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={product.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="m-auto text-dark">
        <div>
          {product.title}{" "}
          {qty > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              {qty}
            </span>
          )}
        </div>
        <div>{product.price * qty}</div>
        <Button variant="outline-dark" onClick={() => removeItem(product.id)}>
          Remove
        </Button>
      </div>
    </Stack>
  );
}
export default CartItem;
