import React, { useState } from "react";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import SidesGroup from "../SidesGroup/SidesGroup";

import "./ModalListing.scss";

const ModalListing = ({
  item,
  mainItems,
  sides,
  addMainItem,
  removeMainItem,
}) => {
  //be able to search in mainItems array if its included. If not, add. if it is, don't.
  const [isOrdered, setIsOrdered] = useState(false);
  const [modalItems, setModalItems] = useState([]);

  // If Item is is already ordered, remove item
  const toggleMainItem = () => {
    if (isOrdered === false) {
      setIsOrdered(true);
      setModalItems([...modalItems, item]);
    } else {
      setIsOrdered(false);
      setModalItems(modalItems.filter((filteredItem) => filteredItem !== item));
    }
  };

  const toggleSideItem = (item) => {
    if (modalItems.includes(item)) {
      setModalItems(modalItems.filter((arrayItem) => arrayItem !== item));
    } else {
      setModalItems([...modalItems, item]);
    }
  };

  const addItems = (items) => {
    addMainItem(items);
  };

  return (
    <div
      className="wrapper mx-2"
      style={{ position: "relative", top: "-50px" }}
    >
      <div
        className="container shadow-sm p-2 pl-1"
        style={{
          backgroundColor: "white",
          zIndex: "50",
          borderRadius: "24px",
          display: "block",
          width: "100%",
        }}
      >
        <h4> {item.food_name}</h4>
        <div className="clearfix my-1">
          <p className="float-left m-0 ">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <a
              href="#modal-reviews"
              className="ml-1 text-secondary text-underline"
            >
              5 reviews
            </a>
          </p>

          <div
            className={`float-right text-center d-block`}
            onClick={() => toggleMainItem(item)}
          >
            <Button
              color={isOrdered ? "secondary" : "primary"}
              size="sm"
              className="rounded-pill"
            >
              {isOrdered ? (
                <i className="fas fa-minus"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </Button>
            <br />
            <p className="font-weight-bold text-primary">
              {isOrdered ? "Remove Item" : "Add Item"}
            </p>
          </div>
          {/*Line break for better alignment */}
          <br />

          <div>
            <span className="text-primary">{item.food_display_price}</span>
          </div>
        </div>
        <p style={{ fontSize: "18px" }}> {item.food_desc} </p>

        {/* If (state.itemToOrder) === true, display bottom part of menu */}
        <CSSTransition
          in={isOrdered}
          classNames="sides-slider"
          timeout={350}
          unmountOnExit
        >
          <div>
                <SidesGroup
                  sides={sides}
                  toggleSideItem={toggleSideItem}
                  modalItems={modalItems}
                />
                <div className="form-group">
                  <textarea
                    id="chef-requests"
                    disabled={false}
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Any special requests for the chef?"
                    style={{
                      resize: "none",
                      background: "whitesmoke",
                      borderRadius: "20px",
                      fontSize: "16px",
                    }}
                    rows="6"
                    name="description"
                  />
                </div>

                {/* This is what sends data to store....this should be linked to a redux Prop.
                Check up to see if this is an array. If it is, it might be easier to manage an array than an object.
             */}
                <Button
                  color={"primary"}
                  className="rounded-pill w-100 mb-3"
                  onClick={() => addItems(modalItems)}
                  size={"lg"}
                >
                  {`Add to order`}
                </Button>
                </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default ModalListing;
