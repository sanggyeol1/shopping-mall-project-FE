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
  const productList = useSelector((state) => state.product.productList);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");

  useEffect(() => {
    dispatch(productActions.getProductList({name}));
  }, [query]);

  return (
    <Container>
      <Row>
        {
          productList.length > 0 ?
            productList?.map((product) => (
              <Col key={product.id} md={3} sm={12}>
                <ProductCard product={product} />
              </Col>
            )) :
            <h3>상품이 없습니다.</h3>
        }
      </Row>
    </Container>
  );
};

export default ProductAll;
