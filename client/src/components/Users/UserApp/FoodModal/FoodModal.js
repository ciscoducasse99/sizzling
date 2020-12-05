import React from "react";

import ModalListing from "./ModalListing/ModalListing";
import ModalHead from "./ModalHead/ModalHead";
import Reviews from "../Reviews/Reviews";
import "./foodmodal.scss";

const FoodModal = ({
  closeModal,
  item,
  sides,
  order,
  addMainItem,
  removeMainItem,
  toggleSideItem
}) => {
  return (
    <>
    {item !== null ?
    <div className="fullscreen">
      <ModalHead
        image={item.food_image}
        handleClick={closeModal}
        order={order}
      />
      <ModalListing
        mainItems={order}
        item={item}
        sides={sides}
        addMainItem={addMainItem}
        removeMainItem={removeMainItem}
        toggleSideItem={toggleSideItem}
      />
      <Reviews />
    </div>
    : null }
    </>
  );
};

export default FoodModal;
