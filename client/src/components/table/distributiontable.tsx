import { DistributionByTypeTable } from "@/interface/distributionbyttype";
import BaseTable from "./basetable";

export default function DistributionTable({headers, tableData}: {headers: string[], tableData: DistributionByTypeTable[]}){
    return(
        <BaseTable>
            <thead>
                <tr>
                    {
                        headers.length > 0 ? headers.map((header)=>(
                            <th key={header}>{header}</th>
                        )) : (
                            <th>No headers</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableData.length > 0 ? tableData.map((data, index)=>(
                        <tr key={index} className="hover:bg-base-200">
                            <td>{data.investment_type}</td>
                            <td>{data.Avg_returns_per_type}</td>
                            <td>{data.profit_loss_per_type}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={headers.length} className="text-center py-4">
                                No data available
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </BaseTable>
    )
}