import Overview from "@/components/overview";

export default function OverviewPage(){
    const tableData = [
        {
            investment_type: "abc",
            investment_amount: 10000,
            return_percent: 8,
            profit_loss: 1200
        },
        {
            investment_type: "xyz",
            investment_amount: 1000,
            return_percent: 8.5,
            profit_loss: 1200
        },
        {
            investment_type: "xxx",
            investment_amount: 50000,
            return_percent: 0.5,
            profit_loss: 100
        },
    ]
    return(
        <div className="py-6 bg-base-300 min-h-screen">
            <div className="max-w-6xl mx-auto mt-10 space-y-4 px-4 py-2">
                <div className="flex flex-col">
                    <h2 className="text-center text-2xl font-bold">Portfolio Overview</h2>
                    <Overview 
                    tableData={tableData} 
                    netProfitLoss={5000}
                    maxProfit={20000} 
                    minProfit={5000} 
                    totalInvested={200000} />
                </div>
                
            </div>
        </div>
    )
}
