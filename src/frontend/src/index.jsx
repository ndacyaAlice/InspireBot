import React from "react";
import ReactDom from  "react-dom/client";
import App from "./App";
import { Contract } from "./utils/icp";



window.renderICPromise = Contract().then(()=>{
    ReactDom.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
        <App/>     
    </React.StrictMode>
    );
}).catch(console.error);
