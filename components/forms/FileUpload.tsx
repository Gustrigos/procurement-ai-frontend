"use client";


import {generateComponents} from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { useState } from "react";

export const { UploadButton, UploadDropzone, Uploader } = 
  generateComponents<OurFileRouter>()

interface FileUploadProps {
  onFileUpload: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [fileUrl, setFileUrl] = useState<string>("");

  return (
    <div>
        <UploadDropzone 
          className="bg-light-1 ut-button:bg-primary-500"
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            if (res.length && res[0].url) {
              setFileUrl(res[0].url);
              onFileUpload(res[0].url); // Call the callback with the file URL
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          />
    </div>
  );
}

export default FileUpload;
