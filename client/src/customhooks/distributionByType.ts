"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { DistributionByType } from "@/interface/distributionbyttype";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export function useDistributionByType(){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [distributionByType, setDistributionByType] = useState<DistributionByType[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(()=>{
        setToken(sessionStorage.getItem("access_token"));
    }, []);

    useEffect(()=>{
        const getDistributionByType = async()=>{
            setIsLoading(true);
            setError(null);
            if (!token) return;

            try {
                const response = await getAndDeleteReq(`${baseUrl}/analytic/distribution`, "GET");
                setDistributionByType(response);
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
        getDistributionByType()
    }, [token]);

    return {isLoading, error, distributionByType}
}