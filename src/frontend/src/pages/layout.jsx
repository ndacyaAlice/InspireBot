import { Outlet } from "react-router";
import TopBar from "../component/TopBar";


const Layout=()=>{
    return(
        <>
        <TopBar/>
        <Outlet/>
        </>
    )
}

export default Layout;