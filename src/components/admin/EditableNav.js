import React, { Component } from "react";
import {
  MDBNav,
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNavItem,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBNavLink,
  MDBBtn,
  MDBIcon,
  toast
} from "mdbreact";
import "./EditableNav.css";
import Toaster from "../Toaster";
import Axios from "axios";
import { RootUrl } from "../constants";

class EditableNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused_index: undefined,
      activeTab: "1",
      deleteModal: false,
      textModal: false,
      inputValue: "",
      iconValue: "",
      categories: [],
      isLoading: true,
      error: ""
    };

    this.getCategories();
  }

  page_ref = this.props.page_ref;

  getCategories = () => {
    Axios.get(`${RootUrl}/category`, { params: { page_ref: this.page_ref } })
      .then(res =>
        this.setState({ categories: res.data.categories, isLoading: false })
      )
      .catch(err => {
        console.log(err)
        // this.setState({ error: err, isLoading: false });
      });
  };

  handleEditorChange = e => this.setState({ [e.target.name]: e.target.value });

  toggleTab = activeTab => e => this.setState({ activeTab });
  toggleModal = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
  };

  addNav = e => {
    this.toggleModal("textModal")(e);
    this.setState({ inputValue: "", iconValue: "" });
  };
  editNav = category_index => e => {
    const { categories } = this.state;
    this.toggleModal("textModal", category_index)(e);
    this.setState({
      inputValue: categories[category_index].name,
      iconValue: categories[category_index].icon
    });
  };
  handleEditNav = e => {
    const { focused_index, inputValue, iconValue } = this.state;
    if (focused_index !== undefined) {
      Axios.patch(`${RootUrl}/category`, {
        page_ref: this.page_ref,
        name: inputValue,
        icon: iconValue,
        id: this.state.categories[focused_index]._id
      })
        .then(res => {
          const { categories } = this.state;
          categories[focused_index] = res.data.category;

          this.setState({ categories, isLoading: false });
          toast.info("קטגוריה עודכנה בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error("עדכון קטגוריה נכשל!");
        });
    } else {
      Axios.post(`${RootUrl}/category`, {
        page_ref: this.page_ref,
        icon: iconValue,
        name: inputValue
      })
        .then(res => {
          const { categories } = this.state;
          categories.push(res.data.category);

          this.setState({ categories, isLoading: false });
          toast.info("קטגוריה נוספה בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error(" הוספת קטגוריה נכשלה!");
        });
    }
    this.toggleModal("textModal")(e);
  };

  deleteNav = category_index => e => {
    this.toggleModal("deleteModal", category_index)(e);
  };
  handleDeleteNav = e => {
    const { focused_index } = this.state;
    const id = this.state.categories[focused_index]._id;
    Axios.delete(`${RootUrl}/category`, {
      params: {
        id
      }
    })
      .then(res => {
        this.setState({
          categories: this.state.categories.filter(elem => elem._id !== id),
          isLoading: false
        });
        toast.info("קטגוריה נמחקה בהצלחה!");
      })
      .catch(err => {
        this.setState({ error: err, isLoading: false });
        toast.error("מחיקת קטגוריה נכשלה!");
      });
    this.toggleModal("deleteModal")(e);
  };

  render() {
    const { render } = this.props;
    const { isLoading, error, categories } = this.state;
    if (isLoading) {
      return <div>טוען</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    const nav_items = categories.map(({ name, icon }, category_index) => {
      return (
        <MDBNavItem>
          <MDBNavLink
            to="#"
            className={
              this.state.activeTab === `${category_index + 1}` ? "active" : ""
            }
            onClick={this.toggleTab(`${category_index + 1}`)}
            role="tab"
          >
            <div className="nav-buttons">
              <MDBIcon
                className="edit-button"
                icon="edit"
                size="sm"
                style={{ marginLeft: "5px" }}
                onClick={this.editNav(category_index)}
              />
              <MDBIcon
                className="remove-button"
                icon="times"
                size="sm"
                onClick={this.deleteNav(category_index)}
              />
            </div>

            <div style={{ fontSize: "24px" }}>
              {icon && <MDBIcon icon={icon} className="mb-2 ml-2" />} {name}
            </div>
          </MDBNavLink>
        </MDBNavItem>
      );
    });
    const nav_contents = categories.map(({ _id }, index) => (
      <MDBTabPane tabId={`${parseInt(index) + 1}`} role="tabpanel">
        {console.log("Rendering! id=" + _id)}
        {" "}
        {render(_id)}
      </MDBTabPane>
    ));

    return (
      <React.Fragment>
        <MDBContainer fluid className="text-center">
          <MDBNav
            tabs
            className="nav-justified upper-navigation"
            color="indigo"
          >
            {nav_items}
            <MDBNavLink
              to="#"
              onClick={this.addNav}
              style={{ minHeight: "60px" }}
            >
              <MDBIcon
                icon="plus"
                size="lg"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />
            </MDBNavLink>
          </MDBNav>
          <MDBTabContent
            className="card"
            activeItem={this.state.activeTab}
            className="text-center my-5 inner-nav-tab-pane"
          >
            {nav_contents}
          </MDBTabContent>
        </MDBContainer>

        <MDBModal
          className="form-elegant "
          isOpen={this.state.textModal}
          toggle={this.toggleModal("textModal")}
        >
          <MDBModalBody className="mx-3">
            <section className="form-elegant">
              <div className="text-center">
                <h1 className="dark-grey-text mb-5">
                  <strong>קטגוריה חדשה</strong>
                </h1>
              </div>

              <MDBInput
                name="inputValue"
                onChange={this.handleEditorChange}
                label="הזן שם קטגוריה"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.inputValue}
              />

              <MDBInput
                name="iconValue"
                onChange={this.handleEditorChange}
                label="הזן שם צלמית (אופציונלי)"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.iconValue}
              />
              <div style={{ textAlign: "center" }}>
                <MDBBtn type="button" onClick={this.toggleModal("textModal")}>
                  <MDBIcon icon="times" size="lg" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="green"
                  onClick={this.handleEditNav}
                >
                  <MDBIcon icon="save" size="lg" />
                </MDBBtn>
              </div>
            </section>
          </MDBModalBody>
        </MDBModal>

        <MDBModal
          className="form-elegant "
          isOpen={this.state.deleteModal}
          toggle={this.toggleModal("deleteModal")}
        >
          <MDBModalBody style={{ textAlign: "center" }}>
            <h4>
              האם אתה בטוח שאתה רוצה למחוק? <br />
              <strong style={{ fontWeight: "900" }}>
                אין דרך לשחזר פעולה זאת!
              </strong>
            </h4>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={this.toggleModal("deleteModal")}>ביטול</MDBBtn>
            <MDBBtn color="red" onClick={this.handleDeleteNav}>
              מחיקה
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <Toaster />
      </React.Fragment>
    );
  }
}

export default EditableNav;
