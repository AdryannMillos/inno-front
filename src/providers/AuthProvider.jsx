// AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import apiService from "../services/apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

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

    if (decodedToken.exp * 1000 > Date.now()) {
      return decodedToken.sub;
    }

    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      const validatedUserId = tokenIsValid(token);
      setLoading(true);
      if (!validatedUserId) {
        logout();
      } else {
        try {
          const response = await apiService.get(`/users/${validatedUserId}`);
          setUserData(response.user);
          setUserId(validatedUserId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ userId, userData, loading }}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { userId, userData, loading });
      })}
    </AuthContext.Provider>
  );
};
export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
