"use client";

import { useEffect, useState } from 'react';
import PdfViewer from '../shared/PDFViewer';
import { Button } from '../ui/button';

function AnalyzeDocument() {
    const [documentData, setDocumentData] = useState({ pdfUrl: '', name: '', description: '' });
    const [analysisData, setAnalysisData] = useState({
        summary: '',
        risks: '',
        savings: '',
        suggestions: ''
    });

    // Extracted fetch logic to a function
    const analyzeDocument = async (pdfUrl: string) => {
        try {
            const response = await fetch('/api/process-pdf/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: "Analise o documento e forneça um resumo, riscos, economias e sugestões",
                    data_dict: {
                        pdf: {
                            pdfUrl: pdfUrl
                        }
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
                savings: result.savings || 'No savings opportunities identified.',
                suggestions: result.suggestions || 'No suggestions provided.'
            });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('documentData') || '{}');
        if (data && data.pdfUrl) {
            setDocumentData(data);
            sessionStorage.removeItem('documentData');
            analyzeDocument(data.pdfUrl);
        }
    }, []);

    const { pdfUrl, name } = documentData;
    const { summary, risks, savings, suggestions } = analysisData;

    return (
        <div className="flex flex-col md:flex-col gap-10">

            <div className="md:self-end mb-5">
                <Button 
                    onClick={() => analyzeDocument(pdfUrl)}
                    className="bg-primary-500 text-light-2"
                >
                    Re-analyze Document
                </Button>
            </div>
            

            <div className="flex flex-col md:flex-row gap-10">

                <div className="flex-1">
                    <h3 className="subhead-text">{name ? name : "Document"}</h3>
                    <PdfViewer pdfUrl={pdfUrl} />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                    <h3 className="subhead-text">1. Summary</h3>
                    <p>{summary}</p>
                    <h3 className="subhead-text">2. Risks</h3>
                    <p>{risks}</p>
                    <h3 className="subhead-text">3. Savings</h3>
                    <p>{savings}</p>
                    <h3 className="subhead-text">4. Suggestions</h3>
                    <p>{suggestions}</p>
                </div>
            </div>
        </div>
    );
}

export default AnalyzeDocument;