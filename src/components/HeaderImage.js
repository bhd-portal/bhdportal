import React from "react";
import { Parallax } from "react-parallax";

function HeaderImage({ title, imageLink }) {
  return (
    <React.Fragment>
      <Parallax bgImage={imageLink} bgImageAlt="Header" strength={500}>
        <div style={{ height: "400px" }} />
      </Parallax>
      <div style={{ position: "relative", marginBottom: "40px" }}>
        <h1
          style={{
            position: "absolute",
            margin: "0",
            left: "50%",
            transform: "translate(-50%, -100%)",
            borderRadius: "15px 15px 0 0",
            background: "#f9f9f9",
            padding: "15px 30px"
          }}
        >
          {title}{" "}
        </h1>
      </div>
    </React.Fragment>
  );
}
export default HeaderImage;
