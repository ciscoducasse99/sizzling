import React from "react";
import SidesListing from "../SidesListing/SidesListing"

const SidesGroup = ({sides, toggleSideItem, modalItems}) => {
  return(
    Object.keys(sides).map((key) => (
      <SidesListing
        key={key}
        data={sides[key]}
        toggleSideItem={toggleSideItem}
        modalItems={modalItems}
      />
    ))
  )
};
export default SidesGroup;
