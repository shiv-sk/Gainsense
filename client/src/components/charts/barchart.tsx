"use client";

import { ChartData, ChartOptions } from "chart.js";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins, ScriptableContext} from "chart.js";
// import { useEffect, useMemo, useRef } from "react";

import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// const data = {
//     labels: ["Stocks", "Crypto", "Mutual Funds", "FD"],
//     datasets:[
//         {
//             label: "Investment Amount",
//             data: [50000, 20000, 30000, 15000],
//             backgroundColor: "rgba(255, 99, 132, 0.5)",
//         },
//         {
//             label: "returns",
//             data: [5000, 200, -3000, 1500],
//             backgroundColor: "rgba(75, 192, 192, 0.6)",
//         },
//     ],
// };

export interface BarchartProps {
    data: ChartData<"bar">;
    options?: ChartOptions<"bar">;
}
export default function Barchart({data, options}: BarchartProps){
    // const delayedRef = useRef(false);
    // const options = useMemo(()=>({
    //     indexAxis: "y" as const,
    //     responsive: true,
    //     animation:{
    //         duration: 1000,
    //         onComplete: ()=>{
    //             delayedRef.current = true;
    //         },
    //         delay: (context: ScriptableContext<"bar">)=>{
    //             if (context.type === 'data' && context.mode === 'default' && !delayedRef.current){
    //                 return context.dataIndex * 300;
    //             }
    //             return 0;
    //         }
    //     },
    //     plugins:{
    //         legend:{
    //             position: "top" as const,
    //         },
    //         title:{
    //             display: true,
    //             text: "Investment Distribution",
    //         }
    //     }
    // }), []);

    // useEffect(()=>{
    //     delayedRef.current = false;
    // }, []);
    return <Bar data={data} options={options} />;
}