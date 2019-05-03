import React from "react";
import LinkPhotoFlipBranch from "./LinkPhotoFlipBranch";
import { MDBRow } from "mdbreact";

const MadorsList = ({ madorim }) => {
  const firstRow = madorim.slice(0, 5).map(mador => {
    return <LinkPhotoFlipBranch {...mador} />;
  });

  const secondRow = madorim.slice(5, madorim.length).map(mador => {
    return <LinkPhotoFlipBranch {...mador} />;
  });

  return (
    <React.Fragment>
      <MDBRow
        className="text-center h-100 w-100"
        center
        style={{ marginTop: "3%", direction: "rtl" }}
      >
        {firstRow}
      </MDBRow>
      <MDBRow
        className="text-cente  h-100 w-100r"
        center
        style={{ marginTop: "3%", direction: "rtl" }}
      >
        {secondRow}
      </MDBRow>
    </React.Fragment>
  );
};

export default MadorsList;
