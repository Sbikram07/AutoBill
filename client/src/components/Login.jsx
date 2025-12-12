import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", admin_key: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.admin_key)
      window.alert("Please fill all the fields");
    try {
      const res = await login(
        formData.name,
         formData.admin_key,
      );
      if (res) {
        navigate("/dashboard");
        console.log("login successful")
      } else {
        console.log("login failed");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-xl text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-linear-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300 ">Name</label>
            <Input
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400 mt-1.5"
            />
          </div>

          {/* Admin Key */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Admin Key
            </label>
            <Input
              type="password"
              placeholder="Enter admin key"
              name="admin_key"
              value={formData.admin_key}
              onChange={handleChange}
              className="bg-slate-800/60 border-white/10 text-white placeholder:text-slate-400 mt-1.5"
            />
          </div>

          {/* Login Button */}
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-md mt-4 "
            onClick={handleSubmit}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
