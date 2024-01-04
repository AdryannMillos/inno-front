// AuthContext.js
import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const isTokenValid = tokenIsValid(token);

    if (!isTokenValid) {
      logout();
    }

  }, []);

  const tokenIsValid = (token) => {
    if (!token) {
      return false;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    const decodedToken = JSON.parse(jsonPayload);

    return decodedToken.exp * 1000 > Date.now();
  };



  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};
