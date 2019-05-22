import React, { Component } from "react";
import { MDBRow, MDBCol, MDBCard } from "mdbreact";
import DocumentBullet from "./Document.js";
import NavComponent from "../NavComponent";
import HeaderImage from "../HeaderImage.js";
import { DocumentsRef } from "../constants";
import Axios from "axios";
import { RootUrl } from "../constants";


class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }

  componentDidMount() {
    Axios.get(`${RootUrl}/document`, {
      params: { category_id: this.props.category_id }
    }).then(response => {
      this.setState({ documents: response.data.documents });
    });
  }

  render() {
    return (
      <Documents
        documents={this.state.documents}
      />
    );
  }

}
const Documents = ({ documents }) => {
  const documentsList = documents.map(document => {
    return (
      <React.Fragment>
        <MDBCol
          className="mt-4"
          style={{ maxWidth: "15rem", minWidth: "15rem", padding: "20px" }}
        >
          <DocumentBullet {...document} />
        </MDBCol>{" "}
      </React.Fragment>
    );
  });
  return (
    <MDBCard>
      <MDBRow center>{documentsList}</MDBRow>
    </MDBCard>
  );
};

class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderImage
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(136).jpg"
          title="טפסים נפוצים"
        />

        <NavComponent
          page_ref={DocumentsRef}
          render={category_id => <Document category_id={category_id} />}
        />
      </React.Fragment>
    );
  }
}
export default DocumentsPage;
