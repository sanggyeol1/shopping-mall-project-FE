import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import ReactPaginate from "react-paginate";
import "../style/orderStatus.style.css";

const MyPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {orderList} = useSelector((state)=>state.order)
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
  });
  const totalPageNum = useSelector((state) => state.order.totalPageNum);


  //오더리스트 들고오기
  useEffect(() => {
    //카트리스트 불러오기
    dispatch(orderActions.getOrderList({ ...searchQuery }))
  }, [query]);

  useEffect(() => {
    if (searchQuery.ordernum === "") {
      delete searchQuery.ordernum;
    }

    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate("?" + queryString);
  }, [searchQuery]);


  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  return (
    
    <Container className="status-card-container">
      {
        orderList?.length > 0
        ? (orderList.map((order, index)=>(
          <OrderStatusCard key={index} order={order}/>
        )))
        : <h3>주문한 상품이 없습니다.</h3>
      }
      <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="display-center list-style-none"
        />
    </Container>
  );
};

export default MyPage;
