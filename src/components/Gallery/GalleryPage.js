import React, {Component} from "react";
import {MDBContainer, MDBCard} from "mdbreact";

import "../../assets/Lightbox.css";
import Gallery from "./Gallery";
import HeaderImage from "../HeaderImage";
import Axios from "axios";
import {RootUrl} from "../constants";

class Gallery2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: []
        };
    }

    componentDidMount() {
        Axios.get(`${RootUrl}/album`, {
            params: {category_id: this.props.category_id}
        }).then(response => {
            this.setState({albums: response.data.albums});
        });
    }

    render() {
        return (
            <Gallery
                documents={this.state.documents}
            />
        );
    }
}

class GalleryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            pictures: []
        };

        this.getAlbumsPictures();
    }

    getAlbumsPictures = () => {
        const { id } = this.state
        Axios.get(`${RootUrl}/picture`, {
            params: {
                'album_id': id
            }
        }).then(res => {
            this.setState({pictures: res.data.pictures});
        }).catch(err => {
            this.setState({error: err});
        });

    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const {name, pictures} = this.state;
        //<HeaderImage imageLink={headerImage}/>
        return (
            <React.Fragment>
                <h1 className="h1-title mb-4 text-center">{name}</h1>
                <MDBContainer
                    fluid
                    className="text-center"
                    style={{alignItems: "center"}}
                >
                    <MDBCard className="text-center" style={{padding: "0 20px"}}>
                        <Gallery pictures={pictures}/>
                    </MDBCard>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default GalleryPage;
