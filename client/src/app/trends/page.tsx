import Barchart from "@/components/charts/barchart"

export default function Trends(){
    const data = {
        labels: [2022, 2023, 2024, 2025],
        datasets: [
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "Investment Amount",
               data: [50000, 20000, 30000, 15000],
               backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
               barPercentage: 0.5,
               barThickness: 25,
               borderRadius: 5,
               label: "profit_loss",
               data: [5000, 200, -3000, 1500],
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
                <div>
                    <h2 className="text-center text-2xl font-bold">Portfolio Investments & Returns by Year</h2>
                    <Barchart data={data}  options={options}/>
                </div>
            </div>
        </div>
    )
}