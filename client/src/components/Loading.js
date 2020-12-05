import React from "react";
import ReactDiv100 from "react-div-100vh";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <ReactDiv100>
      <Spinner color="light" className="mt-5" />
    </ReactDiv100>
  );
};

export default Loading;
