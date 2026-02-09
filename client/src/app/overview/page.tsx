"use client";

import Overview from "@/components/overview";
import { useOverview } from "@/customhooks/overview";

export default function OverviewPage(){
    const {overview, isLoading, error} = useOverview();
    
    const tableData = overview ? overview.overview_table.map((item)=>({
        investment_type: item.investment_type.toUpperCase(),
        investment_amount: item.investment_amount,
        return_percent: +(item.return_percent * 100).toFixed(2),
        net_profit_loss: item.net_profit_loss
    })) : []
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
                    ): overview?.overview_table.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10">
                            No overview data available
                        </div>
                    ): (
                        <div className="flex flex-col">
                            <h2 className="text-center text-2xl font-bold">Portfolio Overview</h2>
                            <Overview 
                            tableData={tableData} 
                            netProfitLoss={overview?.overall_profit_loss ?? 0}
                            maxProfit={overview?.single_highest_profit ?? 0} 
                            minProfit={overview?.single_lowest_profit ?? 0}
                            totalInvested={overview?.total_invested ?? 0} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}