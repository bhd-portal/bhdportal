import React, { Component } from "react";
import { MDBContainer, MDBIcon, MDBRow, MDBCol } from "mdbreact";

class Admin_Advanced extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול משתמשים ולינקים</h1>
        <MDBContainer fluid className="text-right">
          <MDBRow center>
            <MDBCol>
              <div className="card mx-xl-5">
                <div className="card-body">
                  <form>
                    <p className="h4 text-center py-4">החלפת סיסמת אדמין</p>
                    <label
                      htmlFor="defaultFormCardNameEx"
                      className="grey-text font-weight-light"
                    >
                      סיסמא ישנה
                    </label>
                    <input
                      type="password"
                      id="defaultFormCardNameEx"
                      className="form-control "
                    />
                    <br />
                    <label
                      htmlFor="defaultFormCardNameEx"
                      className="grey-text font-weight-light"
                    >
                      סיסמא חדשה
                    </label>
                    <input
                      type="password"
                      id="defaultFormCardNameEx"
                      className="form-control "
                    />
                    <br />
                    <label
                      htmlFor="defaultFormCardEmailEx"
                      className="grey-text font-weight-light"
                    >
                      סיסמת מאסטר
                    </label>
                    <input
                      type="password"
                      id="defaultFormCardEmailEx"
                      className="form-control"
                    />
                    <div className="text-center py-4 mt-3">
                      <button className="btn btn-outline-blue" type="submit">
                        <MDBIcon icon="save" className="ml-2" />
                        עדכן
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </MDBCol>
            <MDBCol>
              <div className="card mx-xl-5">
                <div className="card-body">
                  <form>
                    <p className="h4 text-center py-4">עדכון קישור ל MOOC</p>
                    <label
                      htmlFor="defaultFormCardNameEx"
                      className="grey-text font-weight-light"
                    >
                      קישור חדש
                    </label>
                    <input
                      type="password"
                      id="defaultFormCardNameEx"
                      className="form-control "
                    />

                    <div className="text-center py-4 mt-3">
                      <button className="btn btn-outline-blue" type="submit">
                        <MDBIcon icon="save" className="ml-2" />
                        עדכן
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </MDBCol>
            <MDBCol>
              <div className="card mx-xl-5">
                <div className="card-body">
                  <form>
                    <p className="h4 text-center py-4">עדכון קישור לפורומים</p>
                    <label
                      htmlFor="defaultFormCardNameEx"
                      className="grey-text font-weight-light"
                    >
                      קישור חדש
                    </label>
                    <input
                      type="password"
                      id="defaultFormCardNameEx"
                      className="form-control "
                    />

                    <div className="text-center py-4 mt-3">
                      <button className="btn btn-outline-blue" type="submit">
                        <MDBIcon icon="save" className="ml-2" />
                        עדכן
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>{" "}
      </React.Fragment>
    );
  }
}
export default Admin_Advanced;
