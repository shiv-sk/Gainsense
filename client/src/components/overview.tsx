import { OverviewTable as OverviewTableInterface } from "@/interface/overviewinterface";
import Card from "./cards/card";
import OverviewTable from "./table/overviewtable";

export default function Overview(
    {tableData, netProfitLoss, maxProfit, minProfit, totalInvested}: 
    {tableData: OverviewTableInterface[], netProfitLoss: number, maxProfit: number, minProfit: number, totalInvested: number}){
    const headers = ["Investment_type", "Investment_amount", "Return_percent", "Profit_loss"];
    return(
        <div className="space-y-10 py-4">
            <div className="flex flex-wrap justify-center items-center gap-2">
                <Card 
                datatip={"Total capital invested"} 
                header={"Total Invested"} 
                value={totalInvested}
                cardColor="bg-primary/30"
                tooltipColor="tooltip-primary" />

                <Card 
                datatip={"Net profit or loss across all investments"} 
                header={"Total Net P/L"} 
                value={netProfitLoss}
                cardColor="bg-info/30"
                tooltipColor="tooltip-info" />

                <Card 
                datatip={"Highest profit from a single investment"} 
                header={"Max Profit"} 
                value={maxProfit}
                cardColor="bg-success/30"
                tooltipColor="tooltip-success" />

                <Card 
                datatip={"Lowest profit from a single investment"} 
                header={"Min Profit"} 
                value={minProfit}
                cardColor="bg-warning/30"
                tooltipColor="tooltip-warning" />
            </div>
            <div>
                <OverviewTable headers={headers} tableData={tableData} />
            </div>
        </div>
    )
}