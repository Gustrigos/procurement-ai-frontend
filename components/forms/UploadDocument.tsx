"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { DocumentValidation } from "@/lib/validations/document";
import FileUpload from "./FileUpload";

interface Props {
  document: {
    file1: string;
    file2: string;
    website: string;
    description: string;
  };
}

function UploadDocument() {
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(DocumentValidation),
    defaultValues: {
      file1: '',
      file2: '',
      website: '',
      description: '',
    },
  });

  const handleFileUpload = (url: string, index: number) => {
    setPdfUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls[index] = url;
      return newUrls;
    });
  };

  const onSubmit = async (values: z.infer<typeof DocumentValidation>) => {
    const documentData = {
      pdfs: pdfUrls.map(url => ({ pdfUrl: url })),
      website: values.website,
      description: values.description,
    };

    sessionStorage.setItem('documentData', JSON.stringify(documentData));
    console.log(documentData);
    router.push('/analyze-rfp');
  };
  return (
       <Form {...form}>
      <form className="upload-form mt-10 flex flex-col justify-start gap-10" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="upload-section flex-1">
            <h3 className="subhead-text">RFP</h3>
            <FileUpload onFileUpload={(url) => handleFileUpload(url, 0)} />
          </div>
          <div className="upload-section flex-1">
            <h3 className="subhead-text">RFP Rubric</h3>
            <FileUpload onFileUpload={(url) => handleFileUpload(url, 1)} />
          </div>
        </div>
        <div className="text-input-section flex flex-col md:flex-row gap-10 mt-10">
          <FormField control={form.control} name="website" render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-base-semibold text-dark-2">Website Upload</FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input no-focus" {...field} />
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-base-semibold text-dark-2">Short Description</FormLabel>
              <FormControl>
                <Textarea rows={5} className="account-form_input no-focus" {...field} />
              </FormControl>
            </FormItem>
          )} />
        </div>
        <Button type="submit" className="upload-button bg-primary-500 text-light-2 self-center md:self-start mt-10">
          Process RFP
        </Button>
      </form>
    </Form>

 );
}


export default UploadDocument;
