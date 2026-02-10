"use client";

import { baseUrl, postAndPatchReq } from "@/apicalls/apicalls";
import { isAxiosError } from "axios";
import { useState } from "react";

export function useUploadCsv(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadCsv = async(file: File)=>{
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await postAndPatchReq(`${baseUrl}/investment/upload`, "POST", formData, true);
            return response;
        } catch (err) {
            if(isAxiosError(err)){
                setError(err.response?.data?.detail ?? "Something went wrong");
            }else{
                setError("Unexpected error occurred");
            }
        }finally{
            setIsLoading(false)
        }
    }
    return {isLoading, error, uploadCsv}
}