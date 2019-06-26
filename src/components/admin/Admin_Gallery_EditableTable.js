import React, { Component } from "react";
import {
  MDBCard,
  MDBCollapseHeader,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBCollapse,
  MDBCol,
  MDBRow,
  MDBView,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBBtn,
  toast
} from "mdbreact";
import Toaster from "../Toaster";
import "./Admin_ABGuidance_EditableTable.css";
import "./Editable_Gallery.css";
import Axios from "axios";
import {RootUrl} from "../constants";

class Admin_Gallery_EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: "",
      name: "",
      editModal: false,
      focused_index: undefined,
      delete_index: undefined,
      deleteModal: false,
      albums_dict: {}
     /* images: [
        "https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(63).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(66).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(65).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(67).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(68).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(64).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(69).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(59).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
      ] */
    };

    this.getAlbumsDict();
  }

  getAlbumsDict = () => {
    Axios.get(`${RootUrl}/album`, {
      params: { category_id: this.props.category_id }
    })
        .then(res => {
          const albums = res.data.albums;

          this.setState({ albums_dict: this.getAlbumsImages(albums), isLoading: false})
        }
  )
        .catch(({ error }) => {
          this.setState({ error, isLoading: false });
        });
  };

  getAlbumsImages = ( albums ) => {
    let album;
    let picture_id;

    const albums_dict = {}

    for (album in albums){
      let album_pictures = []

      for (picture_id in album.images){
        Axios.get(`${RootUrl}/picture`, {
          params: { id: picture_id }
        }).then(res =>
            // If an error pops here it will be thrown in getAlbums()
                album_pictures.push(res.data.picture)
        ).catch(({ error }) => {
          console.log(error)
        });
      }

      albums_dict[album.name] = album_pictures
    }

    return albums_dict
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleToggle = (
    modal,
    focused_index = undefined,
    delete_index = undefined
  ) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index, delete_index });
    if (modal === "editModal") {
      if (focused_index !== undefined) {
        this.setState({ name: this.props.albums[focused_index].name });
      } else {
        this.setState({ name: "" });
      }
    }
  };

  renderEditableName = (name, index) => {
    return (
      <React.Fragment>
        <div className="edit-content">
          <div className="edit-buttons">
            <MDBIcon
              className="edit-button"
              icon="edit"
              size="sm"
              style={{ marginLeft: "5px" }}
              onClick={this.handleToggle("editModal", index)}
            />
            <MDBIcon
              className="remove-button"
              icon="times"
              size="sm"
              onClick={this.handleToggle("deleteModal", index)}
            />
          </div>
          <h5
            className="text-right mr-4 ml-4"
            onClick={this.toggleCollapse(index)}
          >
            {name}{" "}
          </h5>
        </div>
      </React.Fragment>
    );
  };

  handleEditName = e => {
    const { category_index } = this.props;
    console.log(
      `In ${category_index}: Edit ${this.state.focused_index} to ${
        this.state.name
      }`
    );
    this.handleToggle("editModal")(e);
    toast.info("אלבום עודכן בהצלחה!");
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  handleDelete = e => {
    const { category_index } = this.props;
    if (this.state.delete_index != undefined) {
      console.log(
        `In ${category_index}: In ${this.state.focused_index}: Delete ${
          this.state.delete_index
        }`
      );
      this.handleToggle("deleteModal")(e);
      toast.info("תמונה נמחקה בהצלחה!");
    } else {
      console.log(`In ${category_index}: Delete ${this.state.focused_index}`);
      this.handleToggle("deleteModal")(e);
      toast.info("אלבום נמחק בהצלחה!");
    }
  };

  renderImages = (album_index, images) => {
    return images.map((imageSrc, index) => {
      return (
        <MDBCol md="4">
          <figure>
            <MDBView hover zoom className="image-view">
              <img
                src={imageSrc}
                style={{ cursor: "default" }}
                alt="Gallery"
                className="img-fluid"
              />

              <div className="gallery-edit-buttons">
                <MDBIcon
                  className="remove-button"
                  icon="times"
                  onClick={this.handleToggle("deleteModal", album_index, index)}
                />
              </div>
            </MDBView>
          </figure>
        </MDBCol>
      );
    });
  };

  renderAlbums() {
    return this.state.albums_dict.map(({ name }, index) => {
      return (
        <MDBCard className="mt-3">
          <MDBCollapseHeader className="text-right editable">
            {this.renderEditableName(name, index)}
            <i
              className={
                this.state.collapseID === index
                  ? "fa fa-angle-down rotate-icon ml-3"
                  : "fa fa-angle-down ml-3"
              }
            />
          </MDBCollapseHeader>
          <MDBCollapse id={index} isOpen={this.state.collapseID}>
            <MDBCardBody className="text-right">
              {/* CHANGE TO REAL IMAGES */}
              <MDBRow>{this.renderImages(index, this.state.images)}</MDBRow>
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <MDBRow center style={{ direction: "rtl" }}>
          <MDBCol>
            <div>
              <MDBBtn size="sm" style={{ marginBottom: "15px" }}>
                <MDBIcon
                  icon="plus"
                  size="lg"
                  style={{
                    color: "green",
                    cursor: "pointer",
                    marginLeft: "15px"
                  }}
                />
                <h5 style={{ display: "inline-block" }}>הוסף אלבום</h5>
              </MDBBtn>
            </div>
            <MDBCard>
              <MDBContainer className="md-accordion mt-0">
                {this.renderAlbums()}
              </MDBContainer>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBModal
          className="form-elegant"
          isOpen={this.state.editModal}
          toggle={this.handleToggle("editModal")}
        >
          <MDBModalBody className="mx-3">
            <section className="form-elegant">
              <div className="text-center">
                <h1 className="dark-grey-text mb-5">
                  <strong>ערוך אלבום</strong>
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
                value={this.state.name}
              />
              <div className="mb-3 pr-5 pl-5">
                <MDBBtn type="button" onClick={this.handleToggle("editModal")}>
                  <MDBIcon icon="times" size="lg" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="green"
                  onClick={this.handleEditName}
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
            <MDBBtn color="red" onClick={this.handleDelete}>
              מחיקה
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <Toaster />
      </React.Fragment>
    );
  }
}

export default Admin_Gallery_EditableTable;
