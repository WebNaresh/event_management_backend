import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TOKEN_KEY = "authToken";
interface DecodedToken {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
export const useAuthToken = () => {
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
  }, [location.pathname]);

  const saveToken = (newToken: string) => {
    Cookies.set(TOKEN_KEY, newToken, { expires: 7 });
    setToken(newToken);
  };

  const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
    setToken(null);
  };

  const getDecodeToken = (): DecodedToken | null => {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) {
      return null;
    }
    return jwtDecode<DecodedToken>(token);
  };

  return {
    token,
    saveToken,
    removeToken,
    getDecodeToken,
  };
};
