import React, { Component } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBModalFooter,
  MDBInput,
  MDBModal,
  MDBModalBody,
  toast,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import { Link } from "react-router-dom";
import "./Admin_Homepage.css";
import Axios from "axios";
import Toaster from "../Toaster";

class Admin_Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      editModal: false,
      focused_index: undefined,
      editValues: { name: "", text: "" },
      ideals: [],
      vision:
        "מערך ההדרכה למודיעין ולסייבר שותף למשימה המודיעינית ואיכותה, במקצוענות הדרכתית מתחדשת ופורצת דרך",

      purpose:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      commander:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      updates: [],
      isLoading: true,
      error: ""
    };

    this.getUpdates();
    this.getIdeals();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getIdeals = () => {
    Axios.get(`http://localhost:5003/api/ideals`)
      .then(response => {
        this.setState({ ideals: response.data});
      })
      .catch(() => {
        this.setState({ error: "Error fetching posts", isLoading: false });
      });
  };

  updateIdeal(ideal, text) {
    Axios.post(`http://localhost:5003/api/ideals/` + ideal._id, {text})
      .then(response => {
        // this.setState({ ideals: response.data});
        toast.info("ערך עודכן בהצלחה!");
      })
      .catch(() => {
        // this.setState({ error: "Error fetching posts", isLoading: false });
        toast.error("ערך לא עודכן");
      });

  }

  getUpdates = () => {
    Axios.get(`http://localhost:5003/api/news`)
      .then(response => {
        this.setState({ updates: response.data, isLoading: false });
      })
      .catch(() => {
        this.setState({ error: "Error fetching posts", isLoading: false });
      });
  };

  handleToggle = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
    if (modal === "editModal") {
      if (focused_index !== undefined) {
        this.setState({ editValues: this.state.updates[focused_index] });
      } else {
        this.setState({ editValues: { bgvideo: "", name: "", text: "" } });
      }
    }
  };

  handleHeaderEdit = e => {
    console.log(
      `Edit to ${this.state.vision} & ${this.state.purpose} & ${
        this.state.commander
      }`
    );

    toast.info("ערך עודכן בהצלחה!");
  };

  handleHeaderChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDelete = e => {
    const { focused_index } = this.state;
    const update_id = this.state.updates[focused_index]._id;
    Axios.delete(`http://localhost:5003/api/news/${update_id}`)
      .then(response => {
        this.setState({
          updates: this.state.updates.filter(elem => elem._id !== update_id)
        });
        toast.info("עדכון נמחק בהצלחה!");
      })
      .catch(() => {
        toast.error("עדכון נמחק נכשל!");
      });
    this.handleToggle("deleteModal")(e);
  };

  handleEdit = e => {
    const { focused_index } = this.state;
    if (focused_index != undefined) {
      const update_id = this.state.updates[focused_index]._id;
      Axios.post(
        `http://localhost:5003/api/news/${update_id}`,
        this.state.editValues
      )
        .then(response => {
          const updates = this.state.updates;
          updates[focused_index] = response.data;
          this.setState({ updates });
          toast.info("עדכון עודכן בהצלחה!");
        })
        .catch(() => {
          toast.error("עדכון העדכון נכשל!");
        });
    } else {
      console.log(this.state.editValues);
      Axios.post(`http://localhost:5003/api/news`, this.state.editValues)
        .then(response => {
          const updates = this.state.updates;
          updates.push(response.data);
          this.setState({ updates });
          toast.info("עדכון נוסף בהצלחה!");
        })
        .catch(() => {
          toast.error("הוספת העדכון נכשל!");
        });
    }
    this.handleToggle("editModal")(e);
  };

  handleChange = e => {
    const { name, value } = e.target;
    let { editValues } = this.state;
    editValues[name] = value;
    this.setState({ editValues });
  };

  onChangeIdeal(e, index) {
    var ideals = this.state.ideals;
    ideals[index].text = e.target.value;
    this.setState({ideals})
  }

  renderIdeals() {
    if(!this.state.ideals.map) { return }
    var idealsElements = this.state.ideals.map((ideal, index) =>
      <MDBCard testimonial className="edit-card">
        <MDBCardHeader>
          <h4 className="card-name card-down">{ideal.name + "ערוך"}</h4>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBInput
            name="vision"
            type="textarea"
            label={ideal.name}
            value={ideal.text}
            onChange={(e) => {this.onChangeIdeal(e, index)}}
          />

          <MDBBtn
            size="mg"
            type="button"
            color="green"
            className="save-button"
            onClick={() => {this.updateIdeal(ideal, this.state.ideals[index].text)}}
          >
            <MDBIcon icon="save" size="lg" />
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    );
    return(idealsElements)
  }

  render() {
    const { isLoading, error } = this.state;
    if (isLoading) {
      return <div>טוען</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    const updates = this.state.updates.map(({ name }, index) => {
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
        <h1 className="h1-name mb-4 text-center">ניהול דף הבית</h1>
        <MDBContainer fluid className="text-center edit-cards">
          {this.renderIdeals()}
        </MDBContainer>
        <MDBContainer
          fluid
          className="text-center"
          style={{ marginTop: "50px" }}
        >
          <h3 style={{ textAlign: "right" }}>נהל עדכונים</h3>
          <table className="table table-hover table-striped">
            <thead className="table-head">
              <tr>
                <th className="table-head" scope="col" width="10%">
                  #
                </th>
                <th className="table-head" scope="col" width="70%">
                  שם העדכון
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
                  colSpan="100%"
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={this.handleToggle("editModal")}
                >
                  <MDBIcon icon="plus" size="lg" />
                </td>
              </tr>
              {updates}
            </tbody>
          </table>
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
                  <strong>ערוך עדכון</strong>
                </h1>
              </div>

              <MDBInput
                name="name"
                onChange={this.handleChange}
                label="שם"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.editValues.name}
              />
              <MDBInput
                name="text"
                onChange={this.handleChange}
                label="תיאור"
                group
                type="textarea"
                rows={2}
                validate
                error="wrong"
                success="right"
                value={this.state.editValues.text}
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
export default Admin_Gallery;
