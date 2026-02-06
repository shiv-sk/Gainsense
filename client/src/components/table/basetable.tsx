export default function BaseTable({ children }: { children: React.ReactNode }){
    return(
        <div className="overflow-auto shadow-lg rounded-lg bg-base-300">
            <table className="table">{children}</table>
        </div>
    )
}