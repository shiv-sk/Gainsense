import { ChartData, ChartOptions } from "chart.js";
import Barchart from "./charts/barchart";
import DistributionTable from "./table/distributiontable";
import { DistributionByTypeTable } from "@/interface/distributionbyttype";
export default function DistributionByType(
    {
        returnchartData, 
        returnchartOptions, 
        investedchartData, 
        investedchartOptions, 
        headers, 
        tableData
    }:
    {
        returnchartData:ChartData<"bar">, 
        returnchartOptions: ChartOptions<"bar">, 
        investedchartData: ChartData<"bar">, 
        investedchartOptions: ChartOptions<"bar">,
        headers: string[],
        tableData:DistributionByTypeTable[]
    }){
    return(
        <div className="space-y-10 py-4">
            <div className="space-y-10">
                <Barchart 
                data={returnchartData} 
                options={returnchartOptions}/>
                <Barchart 
                data={investedchartData} 
                options={investedchartOptions}/>
            </div>
            <div>
                <DistributionTable headers={headers} tableData={tableData} />
            </div>
        </div>
    )
}
