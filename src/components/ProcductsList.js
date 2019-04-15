import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import { RootUrl } from "./constants";
import Axios from "axios";

const Product = ({ title, content, imageURL, link, className }) => {
  return (
    <MDBCol className={className}>
      <a href={link}>
        {" "}
        <div class="card card-cascade mb-4 ">
          <div class="view view-cascade overlay">
            <img class="card-img-top" src={imageURL} alt="Card image cap" />
            <a>
              <div class="mask rgba-white-slight waves-effect waves-light" />
            </a>
          </div>

          <div class="card-body card-body-cascade text-center">
            <h4 class="card-title">
              <strong>{title}</strong>
            </h4>

            <p class="card-text">{content}</p>
          </div>
        </div>
      </a>
    </MDBCol>
  );
};

class ProcductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    Axios.get(`${RootUrl}/product`, {
      params: { subcategory_id: this.props.subcategory_id }
    }).then(response => {
      this.setState({ products: response.data.products });
    });
  }

  render() {
    return this.state.products.map(product => {
      return <Product {...product} className={this.props.type} />;
    });
  }
}

export default ProcductsList;
