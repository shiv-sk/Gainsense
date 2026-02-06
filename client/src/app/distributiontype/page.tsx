import DistributionByType from "@/components/distributionbytype";

export default function DistributionTypePage(){
    const returnchartData = {
        labels: ["Mf", "Stock", "Gold", "Real-estate"],
        datasets: [
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "invested_per_type",
               data: [50000, 20000, 30000, 15000],
               backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ]
    }
    const investedchartData = {
        labels: ["Mf", "Stock", "Gold", "Real-estate"],
        datasets: [
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "avg_return_percent_per_type",
               data: [5000, 200, -3000, 1500],
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
    const headers = ["investment_type", "Avg_returns", "profit_loss"];
    const tableData = [
        {
            investment_type: "Mf",
            Avg_returns_per_type: 5,
            profit_loss_per_type: 2000
        },
        {
            investment_type: "Stock",
            Avg_returns_per_type: -5,
            profit_loss_per_type: -2500
        },
        {
            investment_type: "Gold",
            Avg_returns_per_type: 10,
            profit_loss_per_type: 5000
        },
        {
            investment_type: "Real-estate",
            Avg_returns_per_type: 25,
            profit_loss_per_type: 200000
        },
    ];
    return(
        <div className="py-6 bg-base-300 min-h-screen">
            <div className="max-w-6xl mx-auto mt-10 space-y-4 px-4 py-2">
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
            </div>
        </div>
    )
}