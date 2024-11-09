import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/login-form";

const Login = () => {
  const { getDecodeToken } = useAuthToken();
  const navigate = useNavigate();

  console.log(`🚀 ~ file: Login.tsx:20 ~ getDecodeToken():`, getDecodeToken());
  useEffect(() => {
    if (getDecodeToken()) {
      // Assuming the role is stored in the token or can be fetched
      if (getDecodeToken()?.role === "SUPER_ADMIN") {
        navigate("/super_admin/dashboard");
      } else if (getDecodeToken()?.role === "SECURITY") {
        navigate("/security/dashboard");
      }
    }
  }, [getDecodeToken(), navigate]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
