import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  const { productList, loading } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");

  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
  }, [query]);

  return (
    <Container>
      <Row>
        {loading ? (
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        ) : productList.length > 0 ? (
          productList?.map((product, index) => (
            <Col key={product.id} md={3} sm={12}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <h3>No search results.</h3>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductAll;
