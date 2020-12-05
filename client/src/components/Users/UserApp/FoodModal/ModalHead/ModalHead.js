import React from "react";
import "./modalhead.scss";

const ModalHead = ({ image, handleClick, order }) => {
  return (
    <div
      id="modal-head"
      style={{
        backgroundImage: `url(${image})`,
        height: "32%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="dark-overlay">
        <div
          className="float-left rounded-circle m-3 p-2"
          onClick={handleClick}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <i className="fas fa-arrow-left text-white fa-lg " />
        </div>
        <div
          className="float-right rounded text-white m-3 p-2"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <i className="fas fa-shopping-cart fa-md">
            <span className="ml-1">{order.length}</span>
          </i>
        </div>
      </div>
    </div>
  );
};

export default ModalHead;
