import React from "react";
import { Button } from "reactstrap";
import "./Footer.scss";

const Footer = ({ orderItems, toggleViewOrder }) => {
  return (
    <footer className="fixed-bottom px-3">
      {orderItems.length === 0 ? null : (
        <Button
          className="rounded-pill text-center container-fluid mb-4 mx-auto border-white"
          size="lg"
          style={{ background: "white", color: "black" }}
          onClick={()=> toggleViewOrder()}
        >
          View Order Items ({orderItems.length})
        </Button>
      )}
    </footer>
  );
};

export default Footer;
