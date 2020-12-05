import React from "react";
import MenuListing from "../MenuListing/MenuListing";

const MenuGroup = ({ listing, setModalItem }) => {
  return (
    <div style={{paddingBottom:"60px"}}>
      {Object.keys(listing).map((key) => (
        <MenuListing
          key={key}
          data={listing[key]}
          setModalItem={() => setModalItem()}
        />
      ))}
    </div>
  );
};
export default MenuGroup;
