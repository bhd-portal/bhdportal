import React, { Component } from "react";
import {
  MDBNav,
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

class EditableSubNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused_index: undefined,
      activeTab: "1",
      deleteModal: false,
      textModal: false,
      inputValue: "",
      subtitleValue: "",
      iconValue: "",
      categories: [],
      description: "",
      isLoading: true,
      isEditDescription: false,
      error: undefined
    };

    this.getCategories();
  }
  category_id = this.props.category_id;

  getCategories = () => {
    Axios.get(`${RootUrl}/subcategory`, {
      params: { category_id: this.category_id }
    })
      .then(res =>
        this.setState({ categories: res.data.categories, isLoading: false })
      )
      .catch(({ error }) => {
        this.setState({ error, isLoading: false });
      });
  };

  handleEditorChange = e => this.setState({ [e.target.name]: e.target.value });
  handleDescriptionChange = index => e => {
    const { categories } = this.state;
    categories[index].description = e.target.value;
    this.setState({ categories });
  };

  toggleTab = activeTab => e => this.setState({ activeTab });
  toggleModal = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
  };

  handleEditDescription = index => e => {
    const { subcategory_id } = this.state.categories[index]._id;
    console.log(subcategory_id);
    Axios.patch(`${RootUrl}/subcategory`, {
      id: subcategory_id,
      description: this.state.categories[index].description
    })
      .then(res => {
        toast.info("מסמך עודכן בהצלחה!");
        const { categories } = this.state;
        categories[index] = res.data.subcategory;
        this.setState({ categories });
      })
      .catch(err => {
        toast.error("עדכון המסמך נכשל");
      });

    this.setState({ isEditDescription: false });
  };

  renderEditableDescription = index => {
    if (this.state.isEditDescription) {
      return (
        <div>
          <MDBInput
            name="description"
            label="כתוב תיאור"
            onChange={this.handleEditorChange}
            style={{ padding: "0", margin: "0", border: "none" }}
            group
            type="textarea"
            validate
            error="wrong"
            success="right"
            value={this.state.description}
          />
          <div className="handle-buttons">
            <MDBBtn
              type="button"
              size="sm"
              onClick={() => this.setState({ isEditDescription: false })}
            >
              <MDBIcon icon="times" size="lg" />
            </MDBBtn>
            <MDBBtn
              size="sm"
              type="button"
              color="green"
              onClick={this.handleEditDescription(index)}
            >
              <MDBIcon icon="save" size="lg" />
            </MDBBtn>
          </div>
          <hr />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="edit-content">
            <div className="edit-buttons">
              <MDBIcon
                className="edit-button"
                icon="edit"
                size="sm"
                style={{ marginLeft: "5px" }}
                onClick={() =>
                  this.setState({
                    isEditDescription: true,
                    description: this.state.categories[index].description
                  })
                }
              />
            </div>
            {this.state.categories[index].description && (
              <h5 className="text-right mr-4 ml-4">
                {this.state.categories[index].description}
              </h5>
            )}
            {!this.state.categories[index].description && (
              <h5 className="text-right mr-4 ml-4">כתוב תיאור (אופציונלי)</h5>
            )}

            <hr />
          </div>
        </React.Fragment>
      );
    }
  };

  addNav = e => {
    this.toggleModal("textModal")(e);
    this.setState({ inputValue: "", subtitleValue: "", iconValue: "" });
  };
  editNav = category_index => e => {
    const { categories } = this.state;
    this.toggleModal("textModal", category_index)(e);
    const { name, subtitle, icon } = categories[category_index];
    this.setState({
      inputValue: name,
      subtitleValue: subtitle,
      iconValue: icon
    });
  };
  handleEditNav = e => {
    const { focused_index, inputValue, iconValue, subtitleValue } = this.state;
    if (focused_index !== undefined) {
      Axios.patch(`${RootUrl}/subcategory`, {
        category_id: this.category_id,
        name: inputValue,
        icon: iconValue,
        subtitle: subtitleValue,
        id: this.state.categories[focused_index]._id
      })
        .then(res => {
          const { categories } = this.state;
          categories[focused_index] = res.data.subcategory;

          this.setState({ categories, isLoading: false });
          toast.info("קטגוריה עודכנה בהצלחה!");
        })
        .catch(({ error }) => {
          this.setState({ error, isLoading: false });
          toast.error("עדכון קטגוריה נכשלה!");
        });
      this.toggleModal("textModal")(e);
    } else {
      Axios.post(`${RootUrl}/subcategory`, {
        category_id: this.category_id,
        icon: iconValue,
        subtitle: subtitleValue,
        name: inputValue
      })
        .then(res => {
          const { categories } = this.state;
          categories.push(res.data.subcategory);

          this.setState({ categories, isLoading: false });
          toast.info("קטגוריה נוספה בהצלחה!");
        })
        .catch(({ error }) => {
          this.setState({ error, isLoading: false });
          toast.error(" הוספת קטגוריה נכשלה!");
        });
      this.toggleModal("textModal")(e);
    }
  };

  deleteNav = category_index => e => {
    this.toggleModal("deleteModal", category_index)(e);
  };
  handleDeleteNav = e => {
    const { focused_index } = this.state;
    const id = this.state.categories[focused_index]._id;
    Axios.delete(`${RootUrl}/subcategory`, {
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
      .catch(({ error }) => {
        this.setState({ error, isLoading: false });
        toast.error("מחיקת עדכון נכשלה!");
      });
    this.toggleModal("deleteModal")(e);
  };

  render() {
    const { render, parent_index } = this.props;
    const { isLoading, error, categories } = this.state;
    if (isLoading) {
      return <div>טוען</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    const nav_items = categories.map(
      ({ name, icon, subtitle }, category_index) => {
        return (
          <MDBNavItem style={{ marginLeft: "0px" }}>
            <MDBNavLink
              to="#"
              className={
                this.state.activeTab === `${category_index + 1}` ? "active" : ""
              }
              onClick={this.toggleTab(`${category_index + 1}`)}
              style={{ fontSize: "22px" }}
            >
              <div className="nav-buttons">
                <MDBIcon
                  className="edit-button"
                  icon="edit"
                  style={{ fontSize: "12px", marginLeft: "5px" }}
                  onClick={this.editNav(category_index)}
                />
                <MDBIcon
                  className="remove-button"
                  icon="times"
                  style={{ fontSize: "12px" }}
                  onClick={this.deleteNav(category_index)}
                />
              </div>

              <div style={{ fontSize: "24px", marginTop: "12px" }}>
                {icon && <MDBIcon icon={icon} className="mb-2 ml-2" />} {name}
                {subtitle && (
                  <p style={{ fontSize: "20px", marginBottom: "0px" }}>
                    {subtitle}
                  </p>
                )}
              </div>
            </MDBNavLink>
          </MDBNavItem>
        );
      }
    );
    const nav_contents = categories.map(({ _id }, index) => (
      <MDBTabPane tabId={`${parseInt(index) + 1}`}>
        {" "}
        {this.renderEditableDescription(index)}
        {render(_id)}
      </MDBTabPane>
    ));

    return (
      <React.Fragment>
        <div class="classic-tabs mb-2">
          <MDBNav classicTabs color="cyan">
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
          <MDBTabContent className="card" activeItem={this.state.activeTab}>
            {nav_contents}
          </MDBTabContent>
        </div>

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
                name="subtitleValue"
                onChange={this.handleEditorChange}
                label="הזן תת כותרת (אופציונלי)"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.subtitleValue}
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

export default EditableSubNav;
