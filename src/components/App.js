import React from "react";
import Paperbase from "./common/Paperbase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Paperbase />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
