import React from "react";
import { Button } from "reactstrap";

const DisplayBooth = ({ current_seating, booth, handleModal }) => {
  return (
    <div className="col-md-2 m-md-1 m-lg-4 p-0 text-center">
      <div className="border border-secondary border-bottom-0 main-table">
        <h3
          className={
            current_seating === null ? "text-success mb-0" : "text-danger mb-0"
          }
        >
          {booth}
        </h3>
      </div>
      
      <Button
        style={{ borderRadius: "0 0 13px 13px" }}
        color="secondary"
        disabled={current_seating === null ? true : false}
        block
        onClick={() => handleModal(current_seating)}
      >
        {" "}
        View Table
      </Button>
    </div>
  );
};

export default DisplayBooth;
