// "use client"

// import { useState } from "react"
// // import { Document, Page } from "react-pdf"
// import { Document, Page } from "react-pdf";

// import { Brain, Download, FlashlightIcon as FlashCard, GraduationCap } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"


// // import { pdfjs } from "react-pdf";
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// // import { pdfjs } from 'react-pdf';

// // pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';
// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

// export default function PDFViewer() {
//   const [numPages, setNumPages] = useState(null)
//   const [pageNumber, setPageNumber] = useState(1)

//   // Example PDF URL - replace with your actual PDF URL
//   const pdfUrl = "/Problem Statement.pdf"

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages)
//   }

//   const handleDownload = () => {
//     const link = document.createElement("a")
//     link.href = pdfUrl
//     link.download = "document.pdf"
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   const navigateToFeature = (route) => {
//     window.location.href = route
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Left Panel - PDF Viewer */}
//       <div className="flex-1 flex flex-col p-6 border-r">
//         <div className="flex-1 relative min-h-0">
//           <div className="absolute inset-0 rounded-lg border bg-card">
//             <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className="h-full overflow-auto">
//               <Page
//                 pageNumber={pageNumber}
//                 className="max-w-full"
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//               />
//             </Document>
//           </div>
//         </div>
//         <div className="mt-4 flex items-center justify-between">
//           <div className="text-sm text-muted-foreground">
//             Page {pageNumber} of {numPages}
//           </div>
//           <Button variant="outline" onClick={handleDownload} className="gap-2">
//             <Download className="h-4 w-4" />
//             Download PDF
//           </Button>
//         </div>
//       </div>

//       {/* Right Panel - AI Features */}
//       <div className="w-80 p-6 flex flex-col gap-4">
//         <h2 className="text-2xl font-semibold mb-2">AI Features</h2>
//         <Card className="p-6 space-y-4">
//           <Button className="w-full gap-2 text-lg h-auto py-4" onClick={() => navigateToFeature("/flashcards")}>
//             <FlashCard className="h-5 w-5" />
//             Generate Flash Cards
//           </Button>

//           <Separator className="my-2" />

//           <Button
//             className="w-full gap-2 text-lg h-auto py-4"
//             variant="outline"
//             onClick={() => navigateToFeature("/chat")}
//           >
//             <Brain className="h-5 w-5" />
//             Talk to PDF
//           </Button>

//           <Separator className="my-2" />

//           <Button
//             className="w-full gap-2 text-lg h-auto py-4"
//             variant="secondary"
//             onClick={() => navigateToFeature("/quiz")}
//           >
//             <GraduationCap className="h-5 w-5" />
//             Generate Quiz
//           </Button>
//         </Card>

//         <div className="mt-auto">
//           <p className="text-sm text-muted-foreground text-center">Select a feature to start learning</p>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { Document, Page } from "react-pdf"
import {
  Brain,
  Download,
  FlashlightIcon as FlashCard,
  GraduationCap,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// import { pdfjs } from "react-pdf";
// import workerSrc from "pdfjs-dist/build/pdf.worker.min.js";

// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scale, setScale] = useState(1.0)

  const pdfUrl = "/Problem Statement.pdf"

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error) {
    setError(error)
    setLoading(false)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = "Problem Statement.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const navigateToFeature = (route) => {
    window.location.href = route
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2.0))
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5))

  const AIFeatures = () => (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-semibold">AI Features</h2>
      <Card className="p-6 space-y-4">
        <Button className="w-full gap-2 text-lg h-auto py-4" onClick={() => navigateToFeature("/flashcards")}>
          <FlashCard className="h-5 w-5" />
          Generate Flash Cards
        </Button>

        <Separator className="my-2" />

        <Button
          className="w-full gap-2 text-lg h-auto py-4"
          variant="outline"
          onClick={() => navigateToFeature("/chat")}
        >
          <Brain className="h-5 w-5" />
          Talk to PDF
        </Button>

        <Separator className="my-2" />

        <Button
          className="w-full gap-2 text-lg h-auto py-4"
          variant="secondary"
          onClick={() => navigateToFeature("/quiz")}
        >
          <GraduationCap className="h-5 w-5" />
          Generate Quiz
        </Button>
      </Card>

      <p className="text-sm text-muted-foreground text-center">Select a feature to start learning</p>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* PDF Controls for Mobile */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {pageNumber} of {numPages || "?"}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageNumber(Math.min(numPages || pageNumber, pageNumber + 1))}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <AIFeatures />
          </SheetContent>
        </Sheet>
      </div>

      {/* Left Panel - PDF Viewer */}
      <div className="flex-1 flex flex-col p-4 lg:p-6 lg:border-r">
        <div className="flex-1 relative min-h-[calc(100vh-12rem)] lg:min-h-0">
          <div className="absolute inset-0 rounded-lg border bg-card overflow-auto">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center text-destructive">
                Error loading PDF. Please try again.
              </div>
            ) : (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
                className="min-h-full flex justify-center p-4"
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={null}
                />
              </Document>
            )}
          </div>
        </div>

        {/* PDF Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[100px] text-center">
              Page {pageNumber} of {numPages || "?"}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPageNumber(Math.min(numPages || pageNumber, pageNumber + 1))}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={zoomOut} disabled={scale <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
            <Button variant="outline" size="icon" onClick={zoomIn} disabled={scale >= 2.0}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>
      </div>

      {/* Right Panel - AI Features (Desktop) */}
      <div className="hidden lg:flex w-80 p-6 flex-col gap-4">
        <AIFeatures />
      </div>
    </div>
  )
}