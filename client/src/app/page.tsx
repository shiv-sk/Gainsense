"use client";

import Card from "@/components/cards/card";
import Barchart from "@/components/charts/barchart";
import FileDropzone from "@/components/draganddrop";
import Table from "@/components/table/overviewtable";
import { useState } from "react";

export default function UploadFile(){
    const headers = ["investment_type", "investment_amount", "return_percent", "profit_loss"]
    const tableData = [
      {
        investment_type: "abc",
        investment_amount: 10000,
        return_percent: 8,
        profit_loss: 1200
      },
      {
        investment_type: "xyz",
        investment_amount: 20000,
        return_percent: 8.5,
        profit_loss: 1000
      },
      {
        investment_type: "xxx",
        investment_amount: 123500,
        return_percent: 7,
        profit_loss: 120000,
      },
    ]
    const [file, setFile] = useState<File | null>(null);
    return(
      <>
      <div className="max-w-xl mx-auto mt-10 space-y-4">
        <FileDropzone onFileSelect={setFile} />
          {
            file && (
              <div className="alert alert-success">
                <span>Selected file: {file.name}</span>
              </div>
            )
          }
      </div>
      <Card 
      datatip={"Net profit or loss across all investments"} 
      header={"Net P/L"} 
      value={10000}
      className={"tooltip-info"} />
      <Table headers={headers} tableData={tableData} />
      </>
    )
}