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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>,
      },{
        path: "login",
        element: <Login/>,
      },{
        path:"verify",
        element:<Verify_pin/>
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
