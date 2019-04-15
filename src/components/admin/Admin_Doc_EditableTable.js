import React, { Component } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBInput,
  MDBBtn,
  MDBModalFooter,
  MDBIcon,
  toast
} from "mdbreact";
import { Link } from "react-router-dom";
import Toaster from "../Toaster";
class Admin_Doc_EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      editModal: false,
      focused_index: undefined,
      editValues: { name: "", iconName: "", href: "" },
      documents: this.props.documents
    };
  }

  handleToggle = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
    if (modal === "editModal") {
      if (focused_index !== undefined) {
        this.setState({ editValues: this.state.documents[focused_index] });
      } else {
        this.setState({ editValues: { name: "", iconName: "", href: "" } });
      }
    }
  };

  handleDelete = e => {
    const { category_index, subcategory_index } = this.props;
    console.log(
      `In ${category_index}: In ${subcategory_index}: Delete ${
        this.state.focused_index
      }`
    );
    this.handleToggle("deleteModal")(e);
    toast.info("תוצר נמחק בהצלחה!");
  };

  handleEdit = e => {
    const { category_index, subcategory_index } = this.props;
    console.log(
      `In ${category_index}: In ${subcategory_index}: Edit ${
        this.state.focused_index
      } to ${this.state.editValues}`
    );
    this.handleToggle("editModal")(e);
    toast.info("תוצר עודכן בהצלחה!");
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ editValues: { [name]: value } });
  };

  render() {
    const products = this.state.documents.map(({ name }, index) => {
      return (
        <tr>
          <td className="table-text" scope="row">
            {index}
          </td>
          <td className="table-text">{name}</td>
          <td className="table-edit-delete text-center">
            <Link
              rounded
              onClick={this.handleToggle("editModal", index)}
              to="#"
            >
              <i className="fas fa-edit" />
            </Link>
          </td>
          <td className="table-edit-delete text-center">
            <Link
              rounded
              onClick={this.handleToggle("deleteModal", index)}
              to="#"
            >
              <i className="fas fa-trash-alt red-text" />
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <table className="table table-hover table-striped">
          <thead className="table-head">
            <tr>
              <th className="table-head" scope="col" width="10%">
                #
              </th>
              <th className="table-head" scope="col" width="70%">
                שם הטופס
              </th>
              <th className="table-head  text-center" scope="col" width="10%">
                עריכה
              </th>
              <th className="table-head text-center" scope="col" width="10%">
                מחיקה
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colspan="100%"
                style={{ color: "green", cursor: "pointer" }}
                onClick={this.handleToggle("editModal")}
              >
                <MDBIcon icon="plus" size="lg" />
              </td>
            </tr>
            {products}
          </tbody>
        </table>
        <MDBModal
          className="form-elegant "
          isOpen={this.state.deleteModal}
          toggle={this.handleToggle("deleteModal")}
        >
          <MDBModalBody style={{ textAlign: "center" }}>
            <h4>
              האם אתה בטוח שאתה רוצה למחוק? <br />
              <strong style={{ fontWeight: "900" }}>
                אין דרך לשחזר פעולה זאת!
              </strong>
            </h4>
            <br />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={this.handleToggle("deleteModal")}>ביטול</MDBBtn>
            <MDBBtn onClick={this.handleDelete} color="red">
              מחיקה
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        <MDBModal
          className="form-elegant"
          isOpen={this.state.editModal}
          toggle={this.handleToggle("editModal")}
        >
          <MDBModalBody className="mx-3">
            <section className="form-elegant">
              <div className="text-center">
                <h1 className="dark-grey-text mb-5">
                  <strong>ערוך תוצר הדרכה</strong>
                </h1>
              </div>

              <MDBInput
                name="name"
                onChange={this.handleChange}
                label="הזן שם מסמך"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.editValues.name}
              />
              <MDBInput
                name="iconName"
                onChange={this.handleChange}
                label="הזן שם צלמית"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.editValues.iconName}
              />
              <MDBInput
                name="href"
                onChange={this.handleChange}
                label="הזן קישור למסמך"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.editValues.href}
              />
              <div className="mb-3 pr-5 pl-5">
                <MDBBtn type="button" onClick={this.handleToggle("editModal")}>
                  <MDBIcon icon="times" size="lg" />
                </MDBBtn>
                <MDBBtn type="button" color="green" onClick={this.handleEdit}>
                  <MDBIcon icon="save" size="lg" />
                </MDBBtn>
              </div>
            </section>
          </MDBModalBody>
        </MDBModal>
        <Toaster />
      </React.Fragment>
    );
  }
}
export default Admin_Doc_EditableTable;
