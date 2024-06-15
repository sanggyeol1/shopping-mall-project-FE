import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import "../style/productCard.style.css"

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`)
  };
  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <img
        src={product.image}
        alt=""
      />
      <div className="product-sku"><strong>{product.sku}</strong></div>
      <div className="product-name">{product.name}</div>
      <div className="product-price">\ {product.price}</div>
    </div>
  );
};

export default ProductCard;
