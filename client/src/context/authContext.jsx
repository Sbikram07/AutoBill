import { browser } from "globals";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const baseUrl = import.meta.env.VITE_SERVER_URL;

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  isLogin?localStorage.setItem("isLogin",true):localStorage.setItem("isLogin",false)

  // ===========================
  // LOGIN FUNCTION
  // ===========================
  const login = async (name, admin_key) => {
    try {
        console.log("end point hit")
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, admin_key }),
      });

      if (!response.ok) {
        console.log("Login failed");
        setIsLogin(false);
        return false; // RETURN explicitly
      }

      setIsLogin(true);
      return true; // return success
    } catch (error) {
      console.log("Login Error:", error);
      return false;
    }
  };

  // ===========================
  // LOGOUT
  // ===========================
  const logout = async () => {
    try {
     const res=await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setIsLogin(false);
      if(res.ok){
        return true
      }
      return false
      
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  // ===========================
  // VERIFY ADMIN PIN
  // ===========================
  const verifyAdminPin = async (pin) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/verifyAdminPin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (!response.ok) {
        console.log("Wrong PIN");
        return false;
      }

      return true;
    } catch (error) {
      console.log("PIN Verify Error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, verifyAdminPin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
