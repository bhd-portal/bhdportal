import React from "react";
import BranchPhoto from "./BranchPhoto";
import { MDBRow } from "mdbreact";

const BranchList = ({ branches }) => {
  const firstRow = branches.slice(0, 5).map(branch => {
    return <BranchPhoto {...branch} />;
  });

  const secondRow = branches.slice(5, branches.length).map(branch => {
    return <BranchPhoto {...branch} />;
  });

  return (
    <React.Fragment>
      <MDBRow
        className="text-center"
        center
        style={{ marginTop: "3%", direction: "rtl" }}
      >
        {firstRow}
      </MDBRow>
      <MDBRow
        className="text-center"
        center
        style={{ marginTop: "3%", direction: "rtl" }}
      >
        {secondRow}
      </MDBRow>
    </React.Fragment>
  );
};

export default BranchList;
