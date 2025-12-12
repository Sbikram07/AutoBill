import React from "react";
import Display from "@/components/Display";
import Bill_section from "@/components/Bill_section";
import { Button } from "@/components/ui/button";
import New_bill from "@/components/New_bill";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen w-full px-6 py-8 
                 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 
                 text-white"
    >
      {/* Page Title */}
      {/* Header Row */}
      <div className="w-full flex items-center justify-between mb-5">
        <h1
          className="text-3xl font-bold tracking-wide 
               bg-linear-to-r from-orange-400 to-yellow-400 
               bg-clip-text text-transparent drop-shadow"
        >
          Dashboard
        </h1>

        <New_bill/>
      </div>

      {/* Layout Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 p-3">
        {/* Left Section */}
        <div className="flex justify-center">
          <Display />
        </div>

        {/* Right Section */}
        <div className="flex justify-center mr-3">
          <Bill_section />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
