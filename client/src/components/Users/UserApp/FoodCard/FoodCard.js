import React from "react";
import {
  Badge,
  Card,
  CardText,
  CardImg,
  CardImgOverlay,
} from "reactstrap";
import "../../../../App.css";

const FoodCard = ({ item, setModalItem }) => {
  return (
    <Card
      style={{ display: "inline-block" }}
      key={item.food_id}
      className="mx-2 col-9 col-md-4 col-lg-3  p-0 border-none"
      onClick={() => setModalItem(item)}
    >
      <CardImg top src={item.food_image} alt={item.food_name} />
      <CardImgOverlay className=" bottom p-0 text-white d-flex flex-column align-items-start">  
          <Badge color="secondary" className="m-2 p-1 font-weight-bold">{item.food_display_price}</Badge>
          <CardText className="mt-auto mb-2 mx-2 font-weight-bold">{item.food_name}</CardText>
        
      </CardImgOverlay>
    </Card>
  );
};

export default FoodCard;
