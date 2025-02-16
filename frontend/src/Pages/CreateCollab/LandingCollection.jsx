"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
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
import { useToast } from "@/hooks/use-toast"

export default function PDFViewer() {
  const { materialId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [cookies] = useCookies(["userDetails"])

  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [pdfData, setPdfData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPDF = async () => {
      if (!materialId) {
        setError("No material ID provided")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`http://localhost:2000/material/getMaterialById/${materialId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch PDF")
        }
        const data = await response.json()
        if (data.status === "success" && data.material && data.material.File) {
          const pdfBlob = new Blob([new Uint8Array(data.material.File.data)], { type: "application/pdf" })
          const pdfUrl = URL.createObjectURL(pdfBlob)
          setPdfData(pdfUrl)
        } else {
          throw new Error("Invalid PDF data received")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    console.log("userDetails", cookies.userDetails)
    if (cookies.userDetails && cookies.userDetails.UserID) {
      fetchPDF()
    } else {
      setIsLoading(false)
    }
  }, [materialId, cookies.userDetails])

  const handleDownload = () => {
    if (pdfData) {
      const link = document.createElement("a")
      link.href = pdfData
      link.download = `material_${materialId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
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

  if (!cookies.userDetails || !cookies.userDetails.UserID) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
  <h2 className="text-2xl font-bold mb-4 text-gray-900">Please Login</h2>
  <p className="text-gray-700 mb-6">You need to login to access this page.</p>
  <Button className="text-white bg-blue-500 hover:bg-blue-600" onClick={() => navigate("/login")}>
    Go to Login
  </Button>
</div>

      </div>
    )
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading PDF...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }

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
            aria-label="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">Page {pageNumber}</span>
          <Button variant="outline" size="icon" onClick={() => setPageNumber(pageNumber + 1)} aria-label="Next Page">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open Menu">
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
          <div className="absolute inset-0 rounded-lg border bg-card overflow-hidden">
            {pdfData ? (
              <iframe
                src={pdfData}
                width="100%"
                height="100%"
                style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
                title="PDF Viewer"
              >
                <div className="flex items-center justify-center h-full p-4 text-center">
                  <div className="space-y-4">
                    <p>Unable to display PDF. Please download to view.</p>
                    <Button onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </iframe>
            ) : (
              <div className="flex items-center justify-center h-full">No PDF available</div>
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
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[100px] text-center">Page {pageNumber}</span>
            <Button variant="outline" size="icon" onClick={() => setPageNumber(pageNumber + 1)} aria-label="Next Page">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={zoomOut} disabled={scale <= 0.5} aria-label="Zoom Out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
            <Button variant="outline" size="icon" onClick={zoomIn} disabled={scale >= 2.0} aria-label="Zoom In">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={handleDownload}
            className="gap-2"
            disabled={!pdfData}
            aria-label="Download PDF"
          >
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