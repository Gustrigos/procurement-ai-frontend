import { generateReactHelpers, generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Keep your existing exports
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

// Generate and export UploadDropzone
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();