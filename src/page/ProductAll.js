import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  const products = useSelector((state) => state.product.productList);
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    dispatch(productActions.getProductList(Object.fromEntries([...query])));
  }, [dispatch, query]);

  return (
    <Container>
      <Row>
        {
          products?.map((product) => (
            <Col md={3} sm={12}>
              <ProductCard product={product} />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};

export default ProductAll;
