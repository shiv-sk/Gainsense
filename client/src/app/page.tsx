"use client";

import UploadBtn from "@/components/button/uploadBtn";
import FileDropzone from "@/components/draganddrop";
import { useUploadCsv } from "@/customhooks/uploadCsv";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadFile(){
    const [file, setFile] = useState<File | null>(null);
    const { isLoading, uploadCsv, error } = useUploadCsv();
    const router = useRouter();
    const handleUpload = async()=>{
      if(!file){
        alert("please select CSV file!");
      }else{
        const response = await uploadCsv(file);
        if(response){
          sessionStorage.setItem("access_token", response.access_token);
          sessionStorage.setItem("dataset_id", response.dataset_id);
          router.push("/overview");
        }
      }
    }
    return(
      <div className="py-6 bg-base-300 min-h-screen">
        <div className="max-w-xl mx-auto mt-10 space-y-4">
          <FileDropzone onFileSelect={setFile} />
            {
              file && (
                <div className="alert alert-success">
                  <span>Selected file: {file.name}</span>
                </div>
              )
            }
            {
              error && (
                <div className="text-center text-red-500 mt-4">
                  {error}
                </div>
              )
            }
          <UploadBtn btnText={"Upload"} OnClick={handleUpload} isLoading={isLoading} disable={!file}/>
        </div>
      </div>
    )
}