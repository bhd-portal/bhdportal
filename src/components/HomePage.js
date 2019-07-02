import React, { Component } from "react";
import {
    MDBCol,
    MDBRow,
    MDBCardBody,
    MDBView,
    MDBMask,
    MDBBtn,
    MDBCard
} from "mdbreact";
import "../assets/HomePage.css";
import "../pages/pro/sections/VideoBackgroundPage.css";
import characters from '../images/background/homeHexCharacters.png';
// import characters from "../images/background/homePageCharcaters.png";
// import blueHexagonal from "../images/background/blueHexagonal.png";
// import leftHexagonals from "../images/background/leftHexagonals.png";
// import rightHexagonals from "../images/background/rightExagonals.png";
import blueHexagonal from '../images/background/bluehex.png';
import leftHexagonals from '../images/background/lefthex.png';
import rightHexagonals from '../images/background/righthex.png';
import UpdateBox from "./UpdateBox";
import "../assets/Lightbox.css";
import BranchList from "./BranchList";
import CommanderWord from './commander-word/CommanderWord';
import Axios from "axios";
import { RootUrl } from "./constants";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: characters,
            leftHex: leftHexagonals,
            rightHex: rightHexagonals,
            blueHex: blueHexagonal,
            title: "פורטל מערך ההדרכה",
            subtitle: "למודיעין ולסייבר",
            collapseID: "",
            photoIndex: 0,
            isOpen: false,
            ideals: [{ name: "aaa", text: "bbb" }, { name: "ccc", text: "ddd" }],
            branches: [],
            updates: [],
            words: [],
            isLoading: true
        };

        this.getUpdates();
        this.getBranches();
        this.getIdeals();
        this.getCommanderWords();
    }

    getUpdates = () => {
        Axios.get(`${RootUrl}/news`)
            .then(response => {
                console.log(response.data);
                this.setState({ updates: response.data, isLoading: false });
            })
            .catch(() => {
                this.setState({ error: "Error fetching posts", isLoading: false });
            });
    };

    getBranches = () => {
        Axios.get(`${RootUrl}/branch`)
            .then(res =>
                this.setState({ branches: res.data.branches, isLoading: false })
            )
            .catch(({ error }) => {
                this.setState({ error, isLoading: false });
            });
    };

    getCommanderWords = () => {
        Axios.get(`${RootUrl}/commanderwords`)
            .then(res => {
                console.log(res.data);
                this.setState({ words: res.data, isLoading: false });
            })
            .catch(({ error }) => {
                this.setState({ error, isLoading: false });
            });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderImages = () => {
        let photoIndex = -1;
        const { images } = this.state;

        return images.map(imageSrc => {
            photoIndex++;
            const privateKey = photoIndex;
            return (
                <MDBCol md="1" key={photoIndex}>
                    <figure>
                        <img
                            src={imageSrc}
                            alt="Gallery"
                            className="img-fluid"
                            onClick={() =>
                                this.setState({ photoIndex: privateKey, isOpen: true })
                            }
                        />
                    </figure>
                </MDBCol>
            );
        });
    };

    getIdeals = () => {
        Axios.get(`${RootUrl}/ideals`)
            .then(response => {
                this.setState({ ideals: response.data });
            })
            .catch(() => {
                this.setState({ error: "Error fetching posts", isLoading: false });
            });
    };

    render() {
        const { updates, words, branches, isLoading, error } = this.state;

        if (isLoading) {
            return <div>טוען</div>;
        }
        if (error) {
            return <div>{error}</div>;
        }
        return (
            <React.Fragment>
                <div id="videobackground">
                    <MDBView>
                        <MDBRow id="front-page-title-row" className="">
                            <MDBCol md="12" className="mb-4 white-text front-page-title">
                                {" "}
                                <p className=" front-page-title font-weight-bold mb-1">
                                    {this.state.title}
                                </p>
                                <p className=" font-weight-bold mb-1 front-page-title">
                                    {this.state.subtitle}
                                </p>
                            </MDBCol>
                        </MDBRow>
                        <div className="right-hex">
                            <img src={this.state.rightHex} align="right" />
                        </div>
                        <div className="left-hex">
                            <img src={this.state.leftHex} align="left" />
                        </div>
                        <div className="blue-hex">
                            <img src={this.state.blueHex} />
                        </div>
                        <div className="home-page-characters">
                            <img src={this.state.characters} />
                        </div>
                    </MDBView>

                </div>
                <BranchList branches={branches} />
                <h2
                    className="text-right headline-text-color"
                    style={{ marginRight: "2%", marginTop: "3%" }}
                >
                    :חדשות המערך
                </h2>{" "}
                <MDBRow center style={{ margin: "1%", direction: "rtl" }}>
                    <UpdateBox updates={updates} />
                </MDBRow>
                <div className="commander-words">
                    {words.map(word => {
                        return <CommanderWord title={word.title}
                            content={word.content}
                        />
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default HomePage;
