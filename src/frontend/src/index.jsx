import React from "react";
import ReactDom from  "react-dom/client";
import App from "./App";
import { Contract } from "./utils/icp";
import { Provider } from 'react-redux';
import store from "./redux/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


window.renderICPromise = Contract().then(()=>{
    ReactDom.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
    <Provider store={store}>
    <App/> 
    <ToastContainer/>
    </Provider> 
    </React.StrictMode>
    );
}).catch(console.error);
