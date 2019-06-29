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
import Axios from "axios";
import { RootUrl } from "../constants";
import Dragzone from "./Dragzone";

class Admin_Doc_EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      editModal: false,
      focused_index: undefined,
      name: "",
      icon: "",
      file_if: "",
      powerpoints: []
    };

    this.getPowerpoints();
  }

  handleFiles = files => {
    this.setState({ file: files[0] });
  };

  /*
  uploadFiles = () => {
    console.log("UPLOAD FILES STARTED");
    if (!this.state.file) {
      return alert("No file");
    }
    const data = new FormData();
    data.append("file", this.state.file);
    data.append("filename", this.state.file.name);
    data.append("category", "powerpoints");
    Axios.post(`${RootUrl}/file`, data)
      .then(res => {
        this.setState({ href: res.data.path });
      })
      .catch(error => {
        this.setState({ error });
      });
  }; */

  getPowerpoints = () => {
    Axios.get(`${RootUrl}/powerpoint`, {
      params: { category_id: this.props.category_id }
    })
      .then(res =>
        this.setState({ powerpoints: res.data.powerpoints, isLoading: false })
      )
      .catch(({ error }) => {
        this.setState({ error, isLoading: false });
      });
  };

  handleToggle = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
    if (modal === "editModal") {
      if (focused_index !== undefined) {
        this.setState(this.state.powerpoints[focused_index]);
      } else {
        this.setState({ name: "", icon: "", file_id: "" });
      }
    }
  };

  handleDelete = e => {
    if (this.state.focused_index !== undefined) {
      // delete
      const id = this.state.powerpoints[this.state.focused_index]._id;
      const file_id = this.state.powerpoints[this.state.focused_index].file_id;

      Axios.delete(`${RootUrl}/powerpoint`, {
        params: {
          id
        }
      })
        .then(res => {
          this.setState({
            powerpoints: this.state.powerpoints.filter(elem => elem._id !== id),
            isLoading: false
          });
          Axios.delete(`${RootUrl}/file`, {
            params: {
              'id': file_id
            }
          }).then( res => {
            if (res.status != 200){
              toast.error("נכשל במחיקת הקובץ!");
            } else {
              toast.info("מסמך נמחק בהצלחה!");
            }
          })
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error("מחיקת מסמך נכשלה!");
        });

      this.handleToggle("deleteModal")(e);
      }
    };


  handleEdit = e => {
    const { category_id } = this.props;
    const { focused_index, powerpoints, name, file, icon } = this.state;
    if (focused_index !== undefined) {
      if (file) {
        //save the file_id of the previous file
        const old_file_id = powerpoints[focused_index].file_id;
        const data = new FormData();
        data.append("file", this.state.file);
        data.append("filename", this.state.file.name);
        data.append("category", "powerpoints");
        Axios.post(`${RootUrl}/file`, data).then(res => {
          const file_id = res.data.id;
          Axios.patch(`${RootUrl}/powerpoint`, {
            category_id,
            id: powerpoints[focused_index]._id,
            name,
            icon,
            file_id
          })
            .then(res => {
              powerpoints[focused_index] = res.data.powerpoint;

              this.setState({ powerpoints, isLoading: false });
              toast.info("מסמך עודכן בהצלחה!");
              //after success, delete the previous file
              Axios.delete(`${RootUrl}/file`, {
                params: {
                  'id': old_file_id
                }
              }).then( res => {
                if (res.status != 200){
                  toast.error("נכשל במחיקת המסמך הקודם!");
                }
              })
            })
            .catch(err => {
              this.setState({ error: err, isLoading: false });
              toast.error("עדכון מסמך נכשל!");
            });
        });
      } else {
        let { file_id } = this.state;
        Axios.patch(`${RootUrl}/powerpoint`, {
          category_id,
          id: powerpoints[focused_index]._id,
          name,
          icon,
          file_id
        })
          .then(res => {
            powerpoints[focused_index] = res.data.powerpoint;

            this.setState({ powerpoints, isLoading: false });
            toast.info("מסמך עודכן בהצלחה!");
          })
          .catch(err => {
            this.setState({ error: err, isLoading: false });
            toast.error("עדכון מסמך נכשל!");
          });
      }
    } else {
      console.log(file);
      if (!file) {
        this.handleToggle("editModal")(e);
        toast.error(" הוספת מסמך נכשלה!");
        return;
      } else {
        const data = new FormData();
        data.append("file", this.state.file);
        data.append("filename", this.state.file.name);
        data.append("category", "powerpoints");
        Axios.post(`${RootUrl}/file`, data)
          .then(res => {
            const file_id = res.data.id;
            Axios.post(`${RootUrl}/powerpoint`, {
              category_id,
              icon,
              name,
              file_id
            })
              .then(res => {
                powerpoints.push(res.data.powerpoint);

                this.setState({ powerpoints, isLoading: false });
                toast.info("מסמך נוסף בהצלחה!");
              })
              .catch(err => {
                this.setState({ error: err, isLoading: false });
                toast.error(" הוספת מסמך נכשלה!");
              });
          })
          .catch(error => {
            this.handleToggle("editModal")(e);
            this.setState({ error });
            toast.error(" הוספת מסמך נכשלה!");
            return;
          });
      }
    }
    this.handleToggle("editModal")(e);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const products = this.state.powerpoints.map(({ name }, index) => {
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
                value={this.state.name}
              />
              <MDBInput
                name="icon"
                onChange={this.handleChange}
                label="הזן שם צלמית"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.icon}
              />
              <Dragzone
                handleFiles={this.handleFiles}
                file={this.state.file}
                file_id={this.state.file_id}
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
