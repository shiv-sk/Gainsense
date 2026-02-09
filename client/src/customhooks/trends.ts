"use client";

import { baseUrl, getAndDeleteReq } from "@/apicalls/apicalls";
import { Trends } from "@/interface/trends";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

export function useTrends(){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trends, setTrends] = useState<Trends[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(()=>{
        setToken(sessionStorage.getItem("access_token"));
    }, []);

    useEffect(()=>{
        const getTrends = async()=>{
            setIsLoading(true);
            setError(null);

            if (!token) return;

            try {
                const response = await getAndDeleteReq(`${baseUrl}/analytic/trends`, "GET");
                setTrends(response);
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
        getTrends()
    }, [token]);

    return {isLoading, error, trends}
}