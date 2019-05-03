import React from "react";
import {
  MDBRow,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBContainer,
  MDBTabContent,
  toast
} from "mdbreact";
import EditableBranchPhoto from "./EditableBranchPhoto";
import Toaster from "../Toaster";
import Axios from "axios";
import { RootUrl } from "../constants";
import "./EditableBranchList.css";

const ROW_SIZE = 5;

// name: "מטה",
// imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"

class EditableBranchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      editModal: false,
      name: "",
      imageURL: "",
      branches: [],
      isLoading: true
    };

    this.getBranches();
  }

  getBranches = () => {
    Axios.get(`${RootUrl}/branch`)
      .then(res =>
        this.setState({ branches: res.data.branches, isLoading: false })
      )
      .catch(({ error }) => {
        this.setState({ error, isLoading: false });
      });
  };

  handleEdit = e => {
    const { focused_index, branches, imageURL, name } = this.state;
    if (focused_index !== undefined) {
      Axios.patch(`${RootUrl}/branch`, {
        id: branches[focused_index]._id,
        imageURL,
        name
      })
        .then(res => {
          branches[focused_index] = res.data.branch;

          this.setState({ branches, isLoading: false });
          toast.info("ענף עודכן בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error("עדכון ענף נכשל!");
        });
    } else {
      Axios.post(`${RootUrl}/branch`, {
        imageURL,
        name
      })
        .then(res => {
          branches.push(res.data.branch);

          this.setState({ branches, isLoading: false });
          toast.info("ענף נוסף בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error(" הוספת ענף נכשלה!");
        });
    }
    this.handleToggle("editModal")(e);
  };

  handleDelete = e => {
    const { focused_index, branches } = this.state;
    const id = this.state.branches[focused_index]._id;
    Axios.delete(`${RootUrl}/branch`, {
      params: {
        id
      }
    })
      .then(res => {
        this.setState({
          branches: branches.filter(elem => elem._id !== id),
          isLoading: false
        });
        toast.info("ענף נמחק בהצלחה!");
      })
      .catch(err => {
        this.setState({ error: err, isLoading: false });
        toast.error("מחיקת ענף נכשלה!");
      });
    this.handleToggle("deleteModal")(e);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleToggle = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
    if (modal === "editModal") {
      if (focused_index !== undefined) {
        this.setState(this.state.branches[focused_index]);
      } else {
        this.setState({ imageURL: "", name: "" });
      }
    }
  };

  renderBranches = branches => {
    let branchesArray = [];
    for (let index = 0; index < branches.length; index += ROW_SIZE) {
      let branchesChunk = branches.slice(index, index + ROW_SIZE);
      branchesArray[index / ROW_SIZE] = branchesChunk.map((branch, i) => {
        return (
          <EditableBranchPhoto
            {...branch}
            handleToggle={this.handleToggle}
            index={i + index}
          />
        );
      });
    }

    return branchesArray.map(branchRow => {
      return (
        <MDBRow
          className="text-center"
          center
          style={{ margin: "2% 0", direction: "rtl" }}
        >
          {branchRow}
        </MDBRow>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer fluid className="text-center">
          <MDBRow className="add-row text-center" center>
            <MDBBtn
              outline
              rounded
              color="primary"
              size="lg"
              onClick={this.handleToggle("editModal")}
            >
              <MDBIcon icon="plus" size="2x" />
            </MDBBtn>
          </MDBRow>
          <MDBTabContent className="card">
            {this.renderBranches(this.state.branches)}
          </MDBTabContent>
        </MDBContainer>
        <MDBModal
          className="form-elegant"
          isOpen={this.state.editModal}
          toggle={this.handleToggle("editModal")}
        >
          <MDBModalBody className="mx-3">
            <section className="form-elegant">
              <div className="text-center">
                <h1 className="dark-grey-text mb-5">
                  <strong>ערוך ענף</strong>
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
        <Toaster />
      </React.Fragment>
    );
  }
}

export default EditableBranchList;
