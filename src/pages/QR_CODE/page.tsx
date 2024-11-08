import { useAuthToken } from "@/hooks/useAuthToken";
import QRCode from "react-qr-code";

const QRCodePage = () => {
  const { getDecodeToken } = useAuthToken();
  const decodedToken = getDecodeToken();

  return (
    <div className="flex justify-center items-center h-screen">
      {decodedToken ? (
        <QRCode value={decodedToken.id} />
      ) : (
        <p>No user ID found</p>
      )}
    </div>
  );
};

export default QRCodePage;
