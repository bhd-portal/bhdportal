import React, { Component } from "react";
import { MDBContainer, MDBIcon, MDBRow, MDBCol, toast } from "mdbreact";
import Toaster from "../Toaster";
import { CommanderWordsImages, RootUrl } from "../constants";
import Axios from "axios";

class Admin_CommanderWords extends Component {
  constructor(props) {
    super(props);

    let commanderWords = {};
    Object.keys(CommanderWordsImages).forEach((title) => commanderWords[title] = '');

    this.state = { commanderWords };

  }

  componentDidMount () {
    window.scrollTo(0, 0);

    this.getCommanderWords();
  }

  getCommanderWords = () => {
    Axios.get(`${RootUrl}/commanderwords`, {
      params: { }
    })
      .then(({data}) => {
        let { commanderWords } = this.state;
        //this foreach ensures user can edit all required statements, even if they're missing from the DB
        data.forEach(({title, content}) => commanderWords[title] = content);

        this.setState({ commanderWords, isLoading: false })
        }
      )
      .catch(({ error }) => {
        this.setState({ error, isLoading: false });
      });
  };

  updateCommanderWord = (title, content) => {
    Axios.patch(`${RootUrl}/commanderwords`, {title, content}
    )
      .then(res => {
        toast.info(`${title} עודכן בהצלחה!`)
        }
      )
      .catch(({ error }) => {
        toast.error('שגיאה בעת שמירה: ' + error);
      });
  };

  onSave = () => {
    let { commanderWords } = this.state;

    Object.keys(commanderWords).forEach((title) => this.updateCommanderWord(title, commanderWords[title]));
  };


  render() {
    let { commanderWords } = this.state;

    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול דבר המפקד</h1>
        <MDBContainer fluid className="text-right">
          <MDBRow center>
            <MDBCol>
              <div className="card mx-xl-5">
                <div className="card-body">
                  <form>
                    {
                      Object.keys(commanderWords).map((title) =>
                        <div>
                          <label
                            htmlFor="defaultFormCardNameEx"
                            className="grey-text font-weight-light"
                          >
                            {title}
                          </label>
                          <textarea
                            onChange={((event) => {
                              commanderWords[title] = event.target.value;
                              this.setState({ commanderWords });
                            })}
                            value={commanderWords[title]}
                            className="form-control"
                            rows="5"
                          />

                          <br />
                        </div>)
                    }
                    <div className="text-center py-4 mt-3">
                      <button className="btn btn-outline-blue" type="button" onClick={this.onSave.bind(this)}>
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
        <Toaster/>
      </React.Fragment>
    );
  }
}
export default Admin_CommanderWords;
