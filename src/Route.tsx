import Home from "@/pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import CheckPoints from "./pages/CheckPoints/page";
import EventDetail from "./pages/EventDetail/page";
import Login from "./pages/Login/Login";
import QRCodePage from "./pages/QR_CODE/page";
import SA_DASH from "./pages/SA_DASH/SA_DASH";
import SECURITY_ADMIN_PANEL from "./pages/SEC_DASH/page";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/super_admin/dashboard" element={<SA_DASH />} />
      <Route path="/security/dashboard" element={<SECURITY_ADMIN_PANEL />} />
      <Route path="/security/dashboard/:event_id" element={<CheckPoints />} />
      <Route path="/event/:event_id" element={<EventDetail />} />
      <Route path="/qr_code" element={<QRCodePage />} />
    </Routes>
  );
};
export default App;
