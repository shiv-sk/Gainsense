export interface OverviewTable {
    investment_type: string,
    investment_amount: number,
    return_percent: number,
    profit_loss: number
}

export interface Overview {
    total_invested: number,
    net_profit_loss: number,
    single_investment_highest_profit: number,
    single_investment_lowest_profit: number
    overview_table: OverviewTable[]
}