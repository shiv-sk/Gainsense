"use client";

import Barchart from "@/components/charts/barchart"
import { useTrends } from "@/customhooks/trends"

export default function Trends(){
    const {trends, isLoading, error} = useTrends();
    const data = {
        labels: trends.length > 0 ? trends.map((item)=>(item.year_wise)) : [],
        datasets: [
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "Investment Amount",
               data: trends.length > 0 ? trends.map((item)=>(item.total_invested_per_year)) : [],
               backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "profit_loss",
               data: trends.length > 0 ? trends.map((item)=>(item.profit_loss_per_year)) : [],
               backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ]
    }
    const options = {
        indexAxis: "y" as const,
        responsive: true,
        plugins:{
            legend:{
                position: "top" as const,
            },
            title:{
                display: true,
                text: "Investment & Returns by Year",
            }
        }
    }
    return(
        <div className="py-6 bg-base-300 min-h-screen">
            <div className="max-w-6xl mx-auto mt-10 space-y-4 px-4 py-2">
                {
                    isLoading ? (
                        <div className="flex justify-center items-center">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 mt-10">
                            {error}
                        </div>
                    ) : trends.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10">
                            No trend data available
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <h2 className="text-center text-2xl font-bold">Portfolio Investments & Returns by Year</h2>
                            <Barchart data={data}  options={options}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}