export default function Card(
    {datatip, className, header, value, textColor, cardColor, tooltipColor}: 
    {datatip: string, className?: string, textColor?: string, header: string, cardColor?:string, tooltipColor?: string, value: string | number}){
    return(
        <div className={`card ${cardColor ?? "bg-base-100"} shadow-lg`}>
            <div className="card-body">
                <div className={`flex justify-between items-center ${className}`}>
                    <div className={`tooltip tooltip-top ${tooltipColor}`} data-tip={datatip}>
                        <h2 className="card-title text-lg cursor-help font-semibold">{header}: </h2>
                    </div>
                    <p className={`text-xl font-bold ${textColor}`}>
                        &nbsp;{`₹${Number(value).toLocaleString("en-IN")}`}
                    </p>
                </div>
            </div>
        </div>
    )
}