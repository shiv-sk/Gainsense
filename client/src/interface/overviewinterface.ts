export interface OverviewTable {
    investment_type: string,
    investment_amount: number,
    return_percent: number,
    net_profit_loss: number
}

export interface Overview {
    total_invested: number,
    overall_profit_loss: number,
    single_highest_profit: number,
    single_lowest_profit: number
    overview_table: OverviewTable[]
}