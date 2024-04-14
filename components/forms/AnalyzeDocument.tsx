"use client";

import { useEffect, useState } from 'react';
import PdfViewer from '../shared/PDFViewer';
import { Button } from '../ui/button';


// Define the types for the documents and analysis data
interface DocumentData {
    pdfs: { pdfUrl: string }[];
    website: string;
    description: string;
  }
  
  interface AnalysisData {
    summary: string;
    risks: string;
    savings?: string;  // Added if you still use it somewhere not shown in the example
    suggestions: string;
    score: {
      score: number;
      details: {
        [key: string]: number;  // Flexible dictionary for details
      };
    } | null;  // Assuming score could be null
  }

function AnalyzeDocument() {
    // Correctly type the initial state
    const [documentData, setDocumentData] = useState<DocumentData>({
        pdfs: [],
        website: '',
        description: ''
    });
    const [analysisData, setAnalysisData] = useState<AnalysisData>({
        summary: '',
        risks: '',
        suggestions: '',
        score: null
    });

    // Function to analyze multiple documents
    const analyzeDocuments = async () => {
        try {
            const response = await fetch('/api/process-pdf/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: "Please analyze the PDF content and provide feedback.",
                    data_dict: {
                        pdfs: documentData.pdfs,
                        website: documentData.website
                    }
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result)
            setAnalysisData({
                summary: result.summary || 'No summary provided.',
                risks: result.risks || 'No risks identified.',
                score: result.score || null,
                suggestions: result.suggestions || 'No suggestions provided.'
            });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // Load document data from sessionStorage on component mount
    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('documentData') || '{}');
        if (data && data.pdfs && data.pdfs.length > 0) {
            setDocumentData(data);
            analyzeDocuments();  // Analyze after setting document data
        }
    }, []);

    // Use the first PDF URL for display purposes
    const firstPdfUrl = documentData.pdfs.length > 0 ? documentData.pdfs[0].pdfUrl : '';
    const { summary, risks, score, suggestions } = analysisData;

    return (
        <div className="flex flex-col md:flex-col gap-10">
            <div className="md:self-end mb-5">
                <Button onClick={analyzeDocuments} className="bg-primary-500 text-light-2">
                    Re-analyze Document
                </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                    <h3 className="subhead-text">{documentData.description ? documentData.description : "Document"}</h3>
                    <PdfViewer pdfUrl={firstPdfUrl} />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                    <h3 className="subhead-text">1. Summary</h3>
                    <p>{summary}</p>
                    <h3 className="subhead-text">2. Risks</h3>
                    <p>{risks}</p>
                    <h3 className="subhead-text">3. Score</h3>
                    {score && <div>
                        <p>Overall Score: {score.score}</p>
                        <p>Score Details:</p>
                        {Object.entries(score.details).map(([key, value]) => (
                            <p key={key}>{`${key}: ${value}`}</p>
                        ))}
                    </div>}
                    <h3 className="subhead-text">4. Suggestions</h3>
                    <p>{suggestions}</p>
                </div>
            </div>
        </div>
    );
}

export default AnalyzeDocument;