"use client";

import DistributionByType from "@/components/distributionbytype";
import { useDistributionByType } from "@/customhooks/distributionByType";

export default function DistributionTypePage(){
    const {distributionByType, isLoading, error} = useDistributionByType();

    const labels = distributionByType.length > 0 ? 
    distributionByType.map((distribution)=>(distribution.investment_type.toUpperCase())) : []
    const investedData = distributionByType.length > 0 ? 
    distributionByType.map((distribution)=>(distribution.total_invested_per_type)) : []
    const returnData = distributionByType.length > 0 ? 
    distributionByType.map((distribution)=>(distribution.Avg_returns_per_type)) : []
    const returnchartData = {
        labels: labels,
        datasets: [
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "invested_per_type",
               data: investedData,
               backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ]
    }
    const investedchartData = {
        labels: labels,
        datasets: [
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "avg_return_percent_per_type",
               data: returnData,
               backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ]
    }
    const returnchartOptions = {
        responsive: true,
        plugins:{
            legend:{
                position: "top" as const,
            },
            title:{
                display: true,
                text: "Total Invested Per Type",
            }
        }
    }
    const investedchartOptions = {
        responsive: true,
        plugins:{
            legend:{
                position: "top" as const,
            },
            title:{
                display: true,
                text: "Avg Returns Per Type",
            }
        }
    }
    const headers = ["Investment_type", "Avg_returns", "Profit_loss"];
    const tableData = distributionByType.length > 0 ? distributionByType.map((item)=>({
        investment_type: item.investment_type.toUpperCase(),
        Avg_returns_per_type: +(item.Avg_returns_per_type * 100).toFixed(2),
        profit_loss_per_type: item.profit_loss_per_type,
    })) : []
    
    return(
        <div className="py-6 bg-base-300 min-h-screen">
            <div className="max-w-6xl mx-auto mt-10 space-y-4 px-4 py-2">
                {
                    isLoading ? 
                    <div className="flex justify-center items-center">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div> 
                    : error ? (
                        <div className="text-center text-red-500 mt-10">
                            {error}
                        </div>
                    ): distributionByType.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10">
                            No distributionByType data available
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <h2 className="text-center text-2xl font-bold">Portfolio Distribution by Investment Type</h2>
                            <DistributionByType
                            returnchartData={returnchartData}
                            returnchartOptions={returnchartOptions}
                            investedchartData={investedchartData}
                            investedchartOptions={investedchartOptions} 
                            headers={headers}
                            tableData={tableData} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}