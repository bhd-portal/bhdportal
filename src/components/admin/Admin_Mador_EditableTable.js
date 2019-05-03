import React, { Component } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBInput,
  MDBBtn,
  MDBModalFooter,
  MDBIcon,
  toast,
  MDBContainer,
  MDBTabContent
} from "mdbreact";
import Toaster from "../Toaster";
import { Link } from "react-router-dom";
import Axios from "axios";
import { RootUrl } from "../constants";

class Admin_Mador_EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branch_id: this.props.match.params.id,
      deleteModal: false,
      editModal: false,
      focused_index: undefined,
      imageURL: "",
      name: "",
      content: "",
      link: "",
      description: "",
      isLoading: true,
      error: undefined,
      madorim: []
    };
    this.getMadorim();
  }

  getMadorim = () => {
    Axios.get(`${RootUrl}/mador`, {
      params: { branch_id: this.state.branch_id }
    })
      .then(res =>
        this.setState({ madorim: res.data.madorim, isLoading: false })
      )
      .catch(({ error }) => {
        this.setState({ error, isLoading: false });
      });
  };

  handleToggle = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
    if (modal === "editModal") {
      if (focused_index !== undefined) {
        this.setState(this.state.madorim[focused_index]);
      } else {
        this.setState({
          imageURL: "",
          name: "",
          content: "",
          description: "",
          link: ""
        });
      }
    }
  };

  handleDelete = e => {
    const { focused_index, madorim } = this.state;
    const id = this.state.madorim[focused_index]._id;
    Axios.delete(`${RootUrl}/mador`, {
      params: {
        id
      }
    })
      .then(res => {
        this.setState({
          madorim: madorim.filter(elem => elem._id !== id),
          isLoading: false
        });
        toast.info("מדור נמחק בהצלחה!");
      })
      .catch(err => {
        this.setState({ error: err, isLoading: false });
        toast.error("מחיקת מדור נכשלה!");
      });
    this.handleToggle("deleteModal")(e);
  };

  handleEdit = e => {
    const { branch_id } = this.state;
    const {
      focused_index,
      madorim,
      imageURL,
      name,
      content,
      description,
      link
    } = this.state;
    if (focused_index !== undefined) {
      Axios.patch(`${RootUrl}/mador`, {
        branch_id,
        id: madorim[focused_index]._id,
        imageURL,
        name,
        content,
        description,
        link
      })
        .then(res => {
          madorim[focused_index] = res.data.mador;
          this.setState({ madorim, isLoading: false });
          toast.info("מדור עודכן בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error("עדכון מדור נכשל!");
        });
    } else {
      Axios.post(`${RootUrl}/mador`, {
        branch_id,
        imageURL,
        name,
        content,
        description,
        link
      })
        .then(res => {
          madorim.push(res.data.mador);

          this.setState({ madorim, isLoading: false });
          toast.info("מדור נוסף בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error(" הוספת מדור נכשלה!");
        });
    }
    this.handleToggle("editModal")(e);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const madorim = this.state.madorim.map(({ name }, index) => {
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
        <h1 className="h1-name mb-4 text-center">ניהול מדורים</h1>
        <MDBContainer fluid className="text-center">
          <MDBTabContent className="card">
            <table className="table table-hover table-striped">
              <thead className="table-head">
                <tr>
                  <th className="table-head" scope="col" width="10%">
                    #
                  </th>
                  <th className="table-head" scope="col" width="50%">
                    שם המדור
                  </th>
                  <th
                    className="table-head  text-center"
                    scope="col"
                    width="10%"
                  >
                    עריכה
                  </th>
                  <th
                    className="table-head text-center"
                    scope="col"
                    width="10%"
                  >
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
                {madorim}
              </tbody>
            </table>
          </MDBTabContent>
        </MDBContainer>
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
                  <strong>ערוך מדור</strong>
                </h1>
              </div>

              <MDBInput
                name="imageURL"
                onChange={this.handleChange}
                label="כתובת תמונה"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.imageURL}
              />
              <MDBInput
                name="name"
                onChange={this.handleChange}
                label="שם"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.name}
              />
              <MDBInput
                name="link"
                onChange={this.handleChange}
                label="קישור לאתר המדור (אופציונלי)"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.link}
              />
              <MDBInput
                name="description"
                onChange={this.handleChange}
                label="תיאור"
                group
                type="textarea"
                rows={2}
                validate
                error="wrong"
                success="right"
                value={this.state.description}
              />
              <MDBInput
                name="content"
                onChange={this.handleChange}
                label="תיאור מורחב"
                group
                type="textarea"
                rows={2}
                validate
                error="wrong"
                success="right"
                value={this.state.content}
              />
              <div className="mb-3 pr-5 pl-5" מורחב>
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
export default Admin_Mador_EditableTable;
