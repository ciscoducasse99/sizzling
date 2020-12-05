import React from "react";
import {Link} from 'react-router-dom';

const NoMatchPage = () => {
  return (
    <div className="w-100">
      <div
        className="container text-center"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1 className="display-1">404</h1>
        <h3>Page Not Found</h3>
        <p>Seems like you might have broke our site. How did you get here?</p>
        <button className="btn rounded-pill" style={{backgroundColor:'white'}}>
        <Link to='/' style={{color:"black", textDecoration:'none'}}>Go Home</Link>
        </button>
      </div>
    </div>
  );
};
export default NoMatchPage;
