import React from "react";
import "./App.css"
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/layout";
import OtherSupport from "./pages/otherSupport";
import { AuthContextProvider } from "../src/context/authContext";
import HomePage from "./pages/HomePage";



const routes = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {path:'/', element:<HomePage/>},
        ]
    },
    {
        path: '/',
        element: <AuthContextProvider><Layout/></AuthContextProvider>,
        children: [
            {path:'Dashboard/', element:<Dashboard/>},
            {path:'/Contribute', element: <OtherSupport/>}
        ]
    }
]

const router = (
    <BrowserRouter>
       <Routes>
           {
            routes.map((route)=>(
                <Route key={route.path} path={route.path} element={route.element} >
                     {route.children.map((child)=>(
                        <Route key={child.path} path={child.path} element={child.element}/>
                     ))}  
                </Route>
            ))
           }
       </Routes>
    </BrowserRouter>
);

const App=()=>{
    return router;
}

export default App;