import React from "react";
import { Parallax } from "react-parallax";

function HeaderImage({ title, imageLink }) {
  return (
    <React.Fragment>
      <img src={imageLink} bgImageAlt="Header" style={{width: "100%"}} />

      <div style={{ position: "relative", marginBottom: "40px" }}>
        <h1 className="header-title">
          {title}{" "}
        </h1>
      </div>
    </React.Fragment>
  );
}
export default HeaderImage;
