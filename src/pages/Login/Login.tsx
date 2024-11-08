import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/login-form";

const Login = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Assuming the role is stored in the token or can be fetched
      const userRole = "super_admin"; // Replace with actual role fetching logic
      if (userRole === "super_admin") {
        navigate("/super_admin/dashboard", { replace: false });
      } else {
        navigate("/user/dashboard", {
          replace: true,
          unstable_viewTransition: false,
        });
      }
    }
  }, [token, navigate]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
