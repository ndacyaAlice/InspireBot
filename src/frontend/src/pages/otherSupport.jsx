import React from "react";
import CustomizedAccordionSupport from "../component/SupportAccordion";

const OtherSupport=()=>{
 return(
    <>
         <div className="Dashboard">
         <div className="Title">
            <p>Contribution</p>
            <a href="/Dashboard" style={{textDecoration:"underline", cursor:"pointer"}}>Dashboard</a>
         </div>
         <div style={{marginTop:"20px", marginBottom:"40px"}}></div>
         <div className="accordionContainer">
          <CustomizedAccordionSupport/> 
        </div>
    </div>
</>
 )
}

export default OtherSupport