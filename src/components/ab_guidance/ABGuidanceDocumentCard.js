import React, { useEffect, useState } from "react";
import ABGuidanceDocument from "./ABGuidanceDocument";
import { MDBRow, MDBCol, MDBListGroup } from "mdbreact";
import { RootUrl } from "../constants";
import Axios from "axios";

const ABGuidanceDocumentList = ({ documents }) => {
  const documentsList = documents.map(document => {
    return <ABGuidanceDocument {...document} />;
  });
  if (documents.length <= 5) {
    return (
      <MDBListGroup className="text-right paper-clip-col">
        <MDBRow className="ab-guidance-row">
          <MDBCol className="col-12">{documentsList}</MDBCol>
        </MDBRow>
      </MDBListGroup>
    );
  } else {
    const firstHalf = documentsList.slice(
      0,
      Math.ceil(documentsList.length / 2)
    );
    const secondHalf = documentsList.slice(
      Math.ceil(documentsList.length / 2),
      documentsList.length
    );

    return (
      <MDBListGroup className="text-right paper-clip-col">
        <MDBRow className="ab-guidance-row">
          <MDBCol className="col-6">{firstHalf}</MDBCol>
          <MDBCol className="col-6">{secondHalf}</MDBCol>
        </MDBRow>
      </MDBListGroup>
    );
  }
};

const ABGuidanceDocumentCard = ({ subcategory_id, description = "" }) => {
  let [documents, setState] = useState([]);

  useEffect(
    () =>
      Axios.get(`${RootUrl}/document`, { params: { subcategory_id } }).then(
        response => {
          setState(response.data.documents);
        }
      ),
    []
  );

  return (
    <React.Fragment>
      {" "}
      <h5 className="text-right mr-4 ml-4">{description} </h5>
      <br />
      <hr />
      {console.log(documents)}
      <ABGuidanceDocumentList documents={documents} />{" "}
    </React.Fragment>
  );
};

export default ABGuidanceDocumentCard;
