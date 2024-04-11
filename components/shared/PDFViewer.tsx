"use client"

interface Props {
    pdfUrl: string;
}

const PdfViewer = (document: Props) => {
    const pdfUrl = document?.pdfUrl;

return (
    pdfUrl ? (
        <iframe
            src={pdfUrl}
            frameBorder="0"
            width="100%"
            height="600px"
            allowFullScreen
        ></iframe>
    ) : <p>Please Upload a Document...</p>
);
};

export default PdfViewer;
