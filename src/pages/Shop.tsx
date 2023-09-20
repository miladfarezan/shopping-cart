import productItems from "../data/products.json";
import Product from "../components/product";

import { Row, Col } from "react-bootstrap";

function Shop() {
  return (
    <Row md={2} xs={1} lg={3} className="g-3">
      {productItems.map((item) => {
        return (
          <Col key={item.id}>
            <Product {...item} />
          </Col>
        );
      })}
    </Row>
  );
}
export default Shop;
