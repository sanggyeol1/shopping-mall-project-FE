import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import ToastMessage from "../component/ToastMessage";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { cartActions } from "../action/cartAction";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      dispatch(cartActions.getCartQty());
    }
  }, [user, dispatch]);

  return (
    <div>
      <ToastMessage />
      {location.pathname.includes("admin") ? (
        <Row className="vh-100">
          <Col xs={12} md={3} className="sidebar mobile-sidebar">
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user} />
          {children}
          <Footer />
        </>
      )}
    </div>
  );
};

export default AppLayout;
