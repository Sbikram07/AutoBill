import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Verify_pin from "./components/Verify_pin";
import New_bill from "./components/New_bill";
import { AuthProvider } from "./context/authContext";
import { BillProvider } from "./context/billContext";
import Success from "./pages/Success";
import Canceled from "./pages/Cancled";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        element: <App />, 
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "verify", element: <Verify_pin /> },
          { path: "success/:billId", element: <Success /> },
          { path: "failed/:billId", element: <Canceled /> },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BillProvider>
      <RouterProvider router={router} />
      </BillProvider>
    </AuthProvider>
  </StrictMode>
);
