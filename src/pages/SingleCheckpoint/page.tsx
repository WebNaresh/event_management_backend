"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { Camera, StopCircle, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SingleCheckPoint = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const params = useParams<{ checkpoint_id: string }>();

  const fetchCheckPoint = async () => {
    const response = await axios.get(`/checkpoint/${params.checkpoint_id}`, {
      headers: {
        accept: "*/*",
      },
    });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["check_point"],
    queryFn: () => fetchCheckPoint(),
    enabled: !!params.checkpoint_id,
  });

  const handleScan = (result: string) => {
    setScannedData(result);
    setIsCameraOpen(false);
  };

  const handleError = (error: Error) => {
    console.error("QR scan error:", error);
  };

  const handleStopScanning = () => {
    setIsCameraOpen(false);
  };

  if (isLoading) {
    return <div className="container mt-8">Loading...</div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="container mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load checkpoint data.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container flex flex-col gap-4 mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome to {data?.name || "Checkpoint"}
        </h1>
        <Button onClick={() => setIsCameraOpen(true)} disabled={isCameraOpen}>
          <Camera className="mr-2 h-4 w-4" /> Scan QR Code
        </Button>
      </div>

      {isCameraOpen && (
        <Card className="mt-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              QR Code Scanner
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleStopScanning}
                aria-label="Stop scanning"
              >
                <StopCircle className="h-4 w-4 mr-2" /> Stop
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCameraOpen(false)}
                aria-label="Close camera"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Scanner onScan={(result) => console.log(result)} />;
          </CardContent>
        </Card>
      )}

      {scannedData && (
        <Alert className="mt-4">
          <AlertTitle>QR Code Scanned</AlertTitle>
          <AlertDescription>{scannedData}</AlertDescription>
        </Alert>
      )}

      {data && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Checkpoint Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Event ID:</strong> {data.eventId}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SingleCheckPoint;
