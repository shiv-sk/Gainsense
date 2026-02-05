"use client";

import FileDropzone from "@/components/draganddrop";
import { useState } from "react";

export default function UploadFile(){
    const [file, setFile] = useState<File | null>(null);
    return(
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
    )
}