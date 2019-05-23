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
  const { collapseID, id, date, name, text, toggleCollapse } = props;
  const newDate = date.get; // format date here
  return (
    <MDBCol className="mt-3" style={{borderBottom: "1.5px solid #ccc", padding: "15px"}}>

      <div className="justify-space-between text-right cursor-pointer" onClick={toggleCollapse(id)}>
        <div style={{display: "flex", flexDirection:"column"}}>
        <span style={{fontSize: "1.3rem"}}>{name}</span>
        <span>{ newDate }</span>
        </div>
        <i style={{fontSize: "1.5rem", color: "rgba(255, 51, 102)"}}
          className={
            collapseID === id
              ? "fa fa-minus rotate-icon ml-3"
              : "fa fa-plus ml-3"
          }
        />
      </div>
      <MDBCollapse id={id} isOpen={collapseID}>
        <MDBCardBody className="text-right"><span className="font-md">{text}</span></MDBCardBody>
      </MDBCollapse>
    </MDBCol>
  );
};

export const UpdateCol = props => {
  return (
    <MDBCol className="no-padding">
        <MDBContainer className="md-accordion mt-0">
          {props.children}
        </MDBContainer>
    </MDBCol>
  );
};
