import React from "react";
import FoodCard from "../FoodCard/FoodCard";


const MenuListing = props => {
  return (
    <div className="mb-5">
      <h5 className=" container text-white mb-2">{props.data[0].food_type}</h5>
      <div
        className="rounded-lg px-3 mb-3"
        style={{ overflowX: "auto", overflowY:'hidden', whiteSpace: "nowrap" }}
      >
        <div style={{ display: "block" }}>
          {props.data.map(item => 
            <FoodCard 
              key={item.food_id}
              item={item} 
              setModalItem={props.setModalItem()}
            /> 
          )}
        </div>
      </div>
    </div>
  );
};
export default MenuListing;
