import React from "react";
import {
  MDBCard,
  MDBCollapseHeader,
  MDBCardBody,
  MDBCollapse,
  MDBCol,
  MDBContainer
} from "mdbreact";

export const UpdateBullet = props => {
  const { collapseID, id, name, text, toggleCollapse } = props;
  return (
    <MDBCard className="mt-3">
      <MDBCollapseHeader className="text-right" onClick={toggleCollapse(id)}>
        {name}
        <i
          className={
            collapseID === id
              ? "fa fa-angle-down rotate-icon ml-3"
              : "fa fa-angle-down ml-3"
          }
        />
      </MDBCollapseHeader>
      <MDBCollapse id={id} isOpen={collapseID}>
        <MDBCardBody className="text-right">{text}</MDBCardBody>
      </MDBCollapse>
    </MDBCard>
  );
};

export const UpdateCol = props => {
  return (
    <MDBCol>
      <MDBCard>
        <MDBContainer className="md-accordion mt-0">
          {props.children}
        </MDBContainer>
      </MDBCard>
    </MDBCol>
  );
};
