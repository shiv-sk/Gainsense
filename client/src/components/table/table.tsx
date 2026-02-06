import { OverviewTable } from "@/interface/overviewinterface";

export default function Table({headers, tableData}: {headers: string[], tableData: OverviewTable[]}){
    return(
        <div>
            <div className="overflow-auto shadow-lg rounded-lg bg-base-300">
                <table className="table">
                    {/* head */}
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
                                    <td>{data.investment_amount}</td>
                                    <td>{data.return_percent}</td>
                                    <td>{data.profit_loss}</td>
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
                </table>
            </div>
        </div>
    )
}