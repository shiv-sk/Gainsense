"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { Overview } from "@/interface/overviewinterface";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export function useOverview(){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [overview, setOverview] = useState<Overview | null>(null);
    
    useEffect(()=>{
        const getOverview = async()=>{
            setIsLoading(true);
            setError(null);

            try {
                const response = await getAndDeleteReq(`${baseUrl}/analytic/overview`, "GET");
                setOverview(response);
                return response;
            } catch (err) {
                if(isAxiosError(err)){
                    setError(err.response?.data?.detail ?? "Something went wrong");
                }else{
                    setError("Unexpected error occurred");
                }
            }finally{
                setIsLoading(false);
            }
        }
        getOverview()
    }, []);

    return {isLoading, error, overview}
}