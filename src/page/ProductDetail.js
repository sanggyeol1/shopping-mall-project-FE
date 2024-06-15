import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { cartActions } from "../action/cartAction";
import { commentActions } from "../action/commentAction";
import "../style/productDetail.style.css";
import CommentSection from "../component/CommentSection";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const { user } = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comment.comments); // 올바른 셀렉터
  const { id } = useParams();
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const navigate = useNavigate();

  const addItemToCart = () => {
    if (size === "") {
      setSizeError(true);
      return;
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(cartActions.addToCart({ id, size }));
  };

  const selectSize = (value) => {
    if (sizeError) setSizeError(false);
    setSize(value);
  };



  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
    dispatch(commentActions.getCommentsByProduct(id));
  }, [id, dispatch]);

  const addComment = (comment) => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(commentActions.createComment({ content: comment, productId: id }));
  };

  const deleteComment = (commentId) => {
    dispatch(commentActions.deleteComment(commentId, id));
  };


  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={selectedProduct?.image} className="w-100" alt="image" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info-price-ko">구매가</div>
          <div className="product-info-price">₩ {selectedProduct?.price}</div>
          <div className="product-info-name">{selectedProduct?.name}</div>
          <div className="product-info-des">{selectedProduct?.description}</div>

          <Dropdown className="drop-down size-drop-down" title={size} align="start" onSelect={(value) => selectSize(value)}>
            <Dropdown.Toggle className="size-drop-down" variant={sizeError ? "outline-danger" : "outline-dark"} id="dropdown-basic" align="start">
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            {selectedProduct?.stock && (
              <Dropdown.Menu className="size-drop-down">
                {Object.keys(selectedProduct.stock).map((item) =>
                  selectedProduct.stock[item] > 0 ? (
                    <Dropdown.Item key={item} eventKey={item}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item key={item} eventKey={item} disabled>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  )
                )}
              </Dropdown.Menu>
            )}
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
      <CommentSection comments={comments} addComment={addComment} deleteComment={deleteComment} currentUserId={user?._id}/>
    </Container>
  );
};

export default ProductDetail;
