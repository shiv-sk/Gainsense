/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const getToken = ()=>{
    if(typeof window === "undefined") return;
    return sessionStorage.getItem("access_token") ?? "";
}

const getAndDeleteReq = async(url: string , method: "GET" | "DELETE")=>{
    // console.log("baseurl from getanddelete req:" , baseUrl);
    const token = getToken();
    try {
        const response = await axios({
            url,
            method,
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            withCredentials:true,
        })
        // console.log("response from getAndDeleteReq! " , response?.data);
        return response?.data;
    } catch (error: any) {
        console.log("error from getAndDeleteReq! " , error?.response?.data);
        throw error;
    }
}

const postAndPatchReq = async(url: string , method: "POST" | "PATCH" , data: object | FormData , isFormData=false)=>{
    const token = getToken();
    try {
        const response = await axios({
            url,
            method,
            data,
            headers:{
                "Authorization": `Bearer ${token}`,
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
            },
            withCredentials:true
        })
        // console.log("response from postAndPatchReq! " , response?.data);
        return response?.data;
    } catch (error: any) {
        console.log("error from postAndPatchReq!", error?.response);
        throw error;
    }
}

export {getAndDeleteReq , postAndPatchReq, baseUrl};