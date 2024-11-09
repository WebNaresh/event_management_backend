import { useAuthToken } from "@/hooks/useAuthToken";
import { toPng } from "html-to-image";
import { useRef } from "react";
import QRCode from "react-qr-code";

const QRCodePage = () => {
  const { getDecodeToken } = useAuthToken();
  const decodedToken = getDecodeToken();
  const qrRef = useRef(null);

  const downloadQRCode = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qr-code.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {decodedToken ? (
        <>
          <div ref={qrRef}>
            <QRCode value={decodedToken.id} />
          </div>
          <button
            onClick={downloadQRCode}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Download QR Code
          </button>
        </>
      ) : (
        <p>No user ID found</p>
      )}
    </div>
  );
};

export default QRCodePage;
