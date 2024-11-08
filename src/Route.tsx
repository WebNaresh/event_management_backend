import Home from "@/pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./pages/EventDetail/page";
import Login from "./pages/Login/Login";
import QRCodePage from "./pages/QR_CODE/page";
import SA_DASH from "./pages/SA_DASH/SA_DASH";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/super_admin/dashboard" element={<SA_DASH />} />
      <Route path="/event/:event_id" element={<EventDetail />} />
      <Route path="/qr_code" element={<QRCodePage />} />
    </Routes>
  );
};
export default App;
