import React, { Component } from "react";
import {
  MDBBtnFixed,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBFormInline,
  MDBInput,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
  MDBFileInput
} from "mdbreact";
class Admin_ABGuidance_New_File extends Component {
  state = {
    collapseID: "",
    modal1: false,
    modal2: false,
    radioSet1: false,
    radioSet2: false,
    radioSet3: false,
    activeItem: "1",
    options: [
      {
        checked: false,
        disabled: false,
        icon: null,
        text: "Option One",
        value: "1"
      },
      {
        checked: false,
        disabled: false,
        icon: null,
        text: "Option two",
        value: "2"
      },
      {
        checked: false,
        disabled: false,
        icon: null,
        text: "Option three",
        value: "3"
      },
      {
        checked: false,
        disabled: false,
        icon: null,
        text: "Option four",
        value: "4"
      }
    ]
  };

  getValueOfSelect = value => {
    console.log(value);
  };

  remove = () => {
    this.setState({
      options: this.state.options.slice(0, -1)
    });
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  radioInputHandler = (setNr, radioNr) => () => {
    const radioSetNr = `radioSet${setNr}`;
    this.setState({
      [radioSetNr]: radioNr
    });
  };
  render() {
    const {
      radioSet1,
      radioSet2,
      radioSet3,
      checkbox,
      switchInput
    } = this.state;
    return (
      <React.Fragment>
        {" "}
        <MDBBtnFixed
          onMouseEnter={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onClick={this.toggle(2)}
          floating
          size="md"
          color="green"
          icon="plus"
          style={{ bottom: "60px", left: "8px" }}
        />
        <MDBModal
          className="form-elegant "
          isOpen={this.state.modal2}
          toggle={this.toggle(2)}
          size="lg"
        >
          <MDBModalBody>
            <h3 className="text-center mb-3">הוספת קובץ חדש לא"ב בהדרכה</h3>
            <hr className="mt-2 mb-3" />
            <h4 className="mb-2 text-right">בחר קטגוריית פיקוד:</h4>
            <MDBFormInline>
              <MDBInput
                onChange={this.radioInputHandler(3, 7)}
                checked={radioSet3 === 7 ? true : false}
                label="מפקדים"
                type="radio"
                id="radio7"
              />
              <MDBInput
                onChange={this.radioInputHandler(3, 8)}
                checked={radioSet3 === 8 ? true : false}
                label='מקס"ים'
                type="radio"
                id="radio8"
              />
              <MDBInput
                onChange={this.radioInputHandler(3, 8)}
                checked={radioSet3 === 9 ? true : false}
                label='רמד"ים'
                type="radio"
                id="radio9"
              />
              <MDBInput
                onChange={this.radioInputHandler(3, 8)}
                checked={radioSet3 === 9 ? true : false}
                label='רענ"ים'
                type="radio"
                id="radio9"
              />
            </MDBFormInline>
            <div className="row">
              <div className="col-md-6">
                <MDBSelect
                  getValue={this.getValueOfSelect}
                  getTextContent={this.getValueOfSelect}
                >
                  <MDBSelectInput selected="  בחר את הפרק שאליו תרצה להוסיף את הקובץ" />
                  <MDBSelectOptions>
                    <MDBSelectOption className="text-right">
                      פרק 1
                    </MDBSelectOption>
                    <MDBSelectOption className="text-right">
                      פרק 2
                    </MDBSelectOption>
                    <MDBSelectOption className="text-right">
                      פרק 3
                    </MDBSelectOption>
                    <MDBSelectOption className="text-right">
                      פרק 4
                    </MDBSelectOption>
                  </MDBSelectOptions>
                </MDBSelect>
              </div>
            </div>
            <br />
            <h5 class="right-text">שם הקובץ:</h5>
            <input
              type="text"
              id="defaultFormLoginEmailEx"
              className="form-control"
            />{" "}
            <form>
              <div class="file-field md-form">
                <div class="btn btn-info btn-sm float-right">
                  בחר קובץ
                  <input multiple="" type="file" />
                </div>
                <div class="file-path-wrapper">
                  <input
                    class="file-path validate"
                    type="text"
                    placeholder="..."
                  />
                </div>
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={this.toggle(2)} color="red">
              ביטול
            </MDBBtn>
            <MDBBtn color="green">שמור</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}
export default Admin_ABGuidance_New_File;
