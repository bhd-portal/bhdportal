import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import Portal from "./Portal";

import registerServiceWorker from "./registerServiceWorker";
import AuthProvider from "./components/AuthProvider";

ReactDOM.render(<AuthProvider><Portal /></AuthProvider>, document.getElementById("root"));

registerServiceWorker();
