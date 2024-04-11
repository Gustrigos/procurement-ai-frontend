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
    pdf: string;
    name: string;
    description: string;
  };
}

function UploadDocument() {
  const [pdfUrl, setPdfUrl] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof DocumentValidation>>({
    resolver: zodResolver(DocumentValidation),
    defaultValues: {
      file: "",
      name: "",
      description: "",
    },
  });

  const handleFileUpload = (url: string) => {
    setPdfUrl(url); // Update state with the uploaded PDF URL
    form.setValue("file", url); // Optionally update a form field if you have one for the file URL
  };

  const onSubmit = async (values: z.infer<typeof DocumentValidation>) => {
    const documentData = { pdfUrl, name: values.name, description: values.description };
    sessionStorage.setItem('documentData', JSON.stringify(documentData));

    console.log(documentData)

    router.push('/analyze-document');
  };

  return (
    <Form {...form}>
    <form
      className='mt-10 flex flex-col justify-start gap-10'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Column for File Upload */}
        <div className="flex-1">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Right Column for Name and Description */}
        <div className="flex-1 flex flex-col gap-3">
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='text-base-semibold text-dark-2'>
                  Document Name
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='account-form_input no-focus'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='text-base-semibold text-dark-2'>
                  Short Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    className='account-form_input no-focus'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        <Button type='submit' className='bg-primary-500 text-light-2 self-center md:self-start'>
          Upload Document
        </Button>
        </div>
      </div>

    </form>
  </Form>
  );
}


export default UploadDocument;
