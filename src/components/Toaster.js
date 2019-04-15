import React from "react";
import { ToastContainer } from "mdbreact";

function Toaster(props) {
  return (
    <ToastContainer hideProgressBar newestOnTop autoClose={4000} {...props} />
  );
}
export default Toaster;
