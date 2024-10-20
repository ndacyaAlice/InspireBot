import { toast } from "react-toastify";

export const ToastSuccess=(data)=>{
    toast.success(`${data}`,
        {
     style:{
         backgroundColor: "#196157",
         color: "white"
     },
     autoClose: 2000
 })

}

export const ToastError =(data)=>{
    toast.error(`${data}`,
        {
     style:{
         backgroundColor: "#196157",
         color: "red"
     },
     autoClose: 2000
 })
}