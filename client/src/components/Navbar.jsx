// src/components/Navbar.jsx

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { use } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const {logout}=useAuth()
  const navigate = useNavigate();

  const handleLogout =async () => {
    const res=await logout();
    if(res){
      window.location.reload();
    }
    else {
      console.log("logout failed");
    }


    
  }
  return (
    <header className="w-full sticky top-0 z-50 bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-600 backdrop-blur-xl shadow-lg border-b border-white/10">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 
                      flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png" // FIXED: Vite needs /logo.png, not public\logo.png
            alt="AutoBill Logo"
            className="w-11 h-11 rounded-lg shadow-md"
          />
          <Link
            to="/dashboard"
            className="text-2xl font-bold tracking-wide text-white drop-shadow-sm"
          >
            AutoBill
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {/* Explore */}
          <Link to="/dashboard">
            <Button
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10 transition-all font-semibold"
            >
              Explore
            </Button>
          </Link>

          {/* Logout */}
          <Button
            variant="outline"
            className="bg-white/5 border-white/30 text-white/90 hover:bg-zinc-100/10 hover:text-white transition-all"
            onClick={handleLogout}
          >
            Logout
          </Button>

          {/* Dashboard */}
          <Link to="/verify">
            <Button
              className="bg-purple-500/50 hover:bg-purple-700/60 text-white font-semibold shadow-sm "
              
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
