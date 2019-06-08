import React, {Component} from "react";
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
import characters from "../images/background/homePageCharcaters.png";
import blueHexagonal from "../images/background/blueHexagonal.png";
import leftHexagonals from "../images/background/leftHexagonals.png";
import rightHexagonals from "../images/background/rightExagonals.png";
import UpdateBox from "./UpdateBox";
import "../assets/Lightbox.css";
import ProcductsList from "./ProcductsList";
import BranchList from "./BranchList";
import {Link} from "react-router-dom";
import Axios from "axios";
import {RootUrl} from "./constants";

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
            ideals: [],
            branches: [],
            updates: [],
            isLoading: true
        };

        this.getUpdates();
        this.getBranches();
        this.getIdeals();
    }

    getUpdates = () => {
        Axios.get(`${RootUrl}/news`)
            .then(response => {
                console.log(response.data);
                this.setState({updates: response.data, isLoading: false});
            })
            .catch(() => {
                this.setState({error: "Error fetching posts", isLoading: false});
            });
    };

    getBranches = () => {
        Axios.get(`${RootUrl}/branch`)
            .then(res =>
                this.setState({branches: res.data.branches, isLoading: false})
            )
            .catch(({error}) => {
                this.setState({error, isLoading: false});
            });
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderImages = () => {
        let photoIndex = -1;
        const {images} = this.state;

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
                                this.setState({photoIndex: privateKey, isOpen: true})
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
                this.setState({ideals: response.data});
            })
            .catch(() => {
                this.setState({error: "Error fetching posts", isLoading: false});
            });
    };

    renderIdeals() {
        var idealsElements = this.state.ideals.map(ideal => (
            <MDBCol style={{backgroundColor: "#ede7f6"}}>
                <MDBRow center>
                    <h3 className="font-weight-bold mb-3 mt-2 p-0">
                        <strong>{ideal.name}</strong>
                    </h3>
                </MDBRow>
                <MDBRow center>
                    <h5 style={{padding: "5%"}}>{ideal.text}</h5>
                </MDBRow>
            </MDBCol>
        ));
        return idealsElements;
    }

    render() {
        const {updates, products, branches, isLoading, error} = this.state;

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



                    </MDBView>
                    <div className="right-hex">
                            <img src={this.state.rightHex} height={100} width={100} align="right"/>
                        </div>
                    <div className="left-hex">
                            <img src={this.state.leftHex} height={100} width={100} align="left"/>
                        </div>
                    <div className="blue-hex">
                            <img src={this.state.blueHex} height={100} width={100} />
                        </div>
                </div>
                <BranchList branches={branches}/>
                <h2
                    className="text-right headline-text-color"
                    style={{marginRight: "2%", marginTop: "3%"}}
                >
                    :חדשות המערך
                </h2>{" "}
                <MDBRow center style={{margin: "1%", direction: "rtl"}}>
                    <UpdateBox updates={updates}/>
                </MDBRow>
                {/* <MDBCard
          style={{
            marginTop: "3%",
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "2%"
          }}
        >
          <h2
            className="text-right"
            style={{ marginRight: "2%", marginTop: "1%", marginBottom: "2%" }}
          >
            :תוצרי הדרכה נבחרים
          </h2>{" "}
          <MDBRow
            center
            style={{
              marginTop: "0",
              marginBottom: "0%",
              marginRight: "1%",
              marginLeft: "1%"
            }}
          >
            <ProcductsList products={products} type="home-page-products-col" />
          </MDBRow>{" "}
          <Link to="/products">
            <MDBBtn
              outline
              color="primary"
              className="ml-4 mt-2 mb-4"
              style={{ width: "12%" }}
            >
              :לצפייה בתוצרים נוספים
            </MDBBtn>
          </Link>
        </MDBCard>*/}{" "}
                <MDBCard
                    className="px-3 "
                    style={{
                        marginRight: "2%",
                        marginLeft: "2%",
                        marginBottom: "2%",
                        direction: "rtl"
                    }}
                >
                    <MDBRow className="text-center ">{this.renderIdeals()}</MDBRow>
                </MDBCard>
            </React.Fragment>
        );
    }
}

export default HomePage;
