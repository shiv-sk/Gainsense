"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
    onFileSelect: (file: File) => void;
}

export default function DragDrop({ onFileSelect }: FileDropzoneProps){
    const onDrop = useCallback((acceptedFiles: File[])=>{
        if(acceptedFiles.length > 0){
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect])
    const {getRootProps, getInputProps, isDragActive, isDragReject,} = useDropzone(
        {
            onDrop,
            multiple: false, 
            accept:{"text/csv": [".csv"]}
        }
    )
    return(
        <div {...getRootProps()}
            className={`border-2 border-dashed border-primary rounded-xl p-8 text-center cursor-pointer transition 
            ${
                isDragActive ? "border-primary bg-primary/10" : isDragReject ? 
                "border-error bg-error/10" : "border-secondary hover:border-primary"}`
            }>
            <input {...getInputProps()} />
            <p className="text-lg font-semibold">
                {
                    isDragReject ? "Only CSV files are allowed" : 
                    isDragActive ? "Drop the file here..." : "Drag & drop your CSV file here"
                }
            </p>
            <p className="text-sm text-base-content/60 mt-2">
                or click to browse
            </p>
        </div>
    )
}