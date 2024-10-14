import React from "react";
import { login,logout } from "../../src/utils/auth"

const TopBar=()=>{
    return (
     <div className="topBar">
        <span className="logo">InspireBot</span>
       { window.auth.isAuthenticated?
       <button className="LoginBtn" onClick={logout}>Logout</button>:
       <button className="LoginBtn" onClick={login}>Login</button>
       } 
        
     </div>
    )
}

export default TopBar;