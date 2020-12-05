import React from "react";
import "./SidesListing.scss";

//add seperate function that returns either true or false...maybe thats way to keep track of each individual sides
// what if i add the array to here... I would be able in keep track in array includes each item
// you can add items via the props.addItem

//Find a way to send activeSides up to the parent component and go into order when FoodModal is closed

// I need to find a to be able to make the order length go up when order is added
const SidesListing = ({data, modalItems, toggleSideItem}) => {
  return (
    <div className="my-4">
      <h5 className="m-0 pb-1 text-light">{data[0].food_type}</h5>
      <div
        className="mx-auto text-center px-1 my-2"
        style={{ overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }}
      >
        {data.map((item) => (
          <div
            className={`d-inline-block p-2 mx-1${modalItems.includes(item) ? " side-active" : " "}`}
            key={item.food_id}
            onClick={() => toggleSideItem(item)}
          >
            <img
              style={{ height: "90px", width: "90px" }}
              src={item.food_image}
              className="rounded "
              alt={item.name}
            />
            <br />
            <small className="">{item.food_name}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SidesListing;
