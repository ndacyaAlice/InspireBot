import React from "react";
import { useNavigate } from "react-router-dom";
import CustomizedAccordionSupport from "../component/SupportAccordion";

const OtherSupport=()=>{
   const navigate = useNavigate()
   const goToDash=()=>{
      navigate('/')
     }
 return(
    <>
         <div className="Dashboard">
         <div className="Title">
            <p>Contribution</p>
            <p onClick={goToDash} style={{textDecoration:"underline", cursor:"pointer"}}>Dashboard</p>
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