export default function BaseTable({ children }: { children: React.ReactNode }){
    return(
        <div className="overflow-auto shadow-lg rounded-lg bg-base-100">
            <table className="table">{children}</table>
        </div>
    )
}