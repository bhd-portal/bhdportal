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
import Toaster from "../Toaster";
import { Link } from "react-router-dom";
import Axios from "axios";
import { RootUrl } from "../constants";

class Admin_Prod_EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      editModal: false,
      focused_index: undefined,
      imageURL: "",
      title: "",
      content: "",
      isLoading: true,
      error: undefined,
      products: []
    };

    this.getProducts();
  }

  getProducts = () => {
    Axios.get(`${RootUrl}/product`, {
      params: { subcategory_id: this.props.subcategory_id }
    })
      .then(res =>
        this.setState({ products: res.data.products, isLoading: false })
      )
      .catch(({ error }) => {
        this.setState({ error, isLoading: false });
      });
  };

  handleToggle = (modal, focused_index = undefined) => e => {
    this.setState({ [modal]: !this.state[modal], focused_index });
    if (modal === "editModal") {
      if (focused_index !== undefined) {
        this.setState(this.state.products[focused_index]);
      } else {
        this.setState({ imageURL: "", title: "", content: "" });
      }
    }
  };

  handleDelete = e => {
    const { focused_index, products } = this.state;
    const id = this.state.products[focused_index]._id;
    Axios.delete(`${RootUrl}/product`, {
      params: {
        id
      }
    })
      .then(res => {
        this.setState({
          products: products.filter(elem => elem._id !== id),
          isLoading: false
        });
        toast.info("תוצר נמחק בהצלחה!");
      })
      .catch(err => {
        this.setState({ error: err, isLoading: false });
        toast.error("מחיקת תוצר נכשלה!");
      });
    this.handleToggle("deleteModal")(e);
  };

  handleEdit = e => {
    const { subcategory_id } = this.props;
    const { focused_index, products, imageURL, title, content } = this.state;
    if (focused_index !== undefined) {
      Axios.patch(`${RootUrl}/product`, {
        subcategory_id,
        id: products[focused_index]._id,
        imageURL,
        title,
        content
      })
        .then(res => {
          products[focused_index] = res.data.product;

          this.setState({ products, isLoading: false });
          toast.info("תוצר עודכן בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error("עדכון תוצר נכשל!");
        });
    } else {
      Axios.post(`${RootUrl}/product`, {
        subcategory_id,
        imageURL,
        title,
        content
      })
        .then(res => {
          products.push(res.data.product);

          this.setState({ products, isLoading: false });
          toast.info("תוצר נוסף בהצלחה!");
        })
        .catch(err => {
          this.setState({ error: err, isLoading: false });
          toast.error(" הוספת תוצר נכשלה!");
        });
    }
    this.handleToggle("editModal")(e);
  };

  handleCheckbox = index => e => {
    const { subcategory_id } = this.props;
    const { products } = this.state;
    Axios.patch(`${RootUrl}/product`, {
      subcategory_id,
      id: products[index]._id,
      checked: e.target.checked
    })
      .then(res => {
        products[index] = res.data.product;

        this.setState({ products, isLoading: false });
        toast.info("תוצר עודכן בהצלחה!");
      })
      .catch(err => {
        this.setState({ error: err, isLoading: false });
        toast.error("עדכון תוצר נכשל!");
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const products = this.state.products.map(({ title, checked }, index) => {
      return (
        <tr>
          <td className="table-text" scope="row">
            {index}
          </td>
          <td className="table-text">
            <MDBInput
              label="נבחר"
              type="checkbox"
              checked={checked}
              id={`checkbox${index}`}
              onChange={this.handleCheckbox(index)}
            />
          </td>
          <td className="table-text">{title}</td>
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
              <th className="table-head" scope="col" width="20%">
                תוצר נבחר
              </th>
              <th className="table-head" scope="col" width="50%">
                שם התוצר
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
                name="title"
                onChange={this.handleChange}
                label="שם"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.title}
              />
              <MDBInput
                name="content"
                onChange={this.handleChange}
                label="תיאור"
                group
                type="textarea"
                rows={2}
                validate
                error="wrong"
                success="right"
                value={this.state.content}
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
export default Admin_Prod_EditableTable;
