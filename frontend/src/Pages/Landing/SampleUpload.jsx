
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer); // Convert to buffer format

      // const requestBody = {
      //   CollectionID: "1", // Replace with actual CollectionID
      //   CreatedByID: "1", // Replace with actual CreatedByID
      //   File: Array.from(buffer), // Convert buffer to array for JSON
      // };

      const formData = new FormData();
      formData.append("CollectionID", 1);
      formData.append("CreatedByID", 1);
      formData.append("File", file);

      const response = await axios.post(
        "http://localhost:2000/material/addMaterial",
        formData
      );

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-4 shadow-lg">
        <CardContent>
          <Input type="file" accept="application/pdf" onChange={handleFileChange} />
          <Button className="w-full mt-4" onClick={uploadFile} disabled={loading}>
            {loading ? "Uploading..." : "Upload PDF"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


