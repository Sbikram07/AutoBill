import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Verify_pin = () => {
  const [pin, setPin] = useState(new Array(6).fill(""));

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only digits allowed

    const updatedPin = [...pin];
    updatedPin[index] = value.slice(-1); // Keep last digit
    setPin(updatedPin);

    // Automatically focus next box
    if (value && index < 5) {
      const next = document.getElementById(`pin-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900/60 border border-white/10 rounded-xl shadow-xl backdrop-blur-lg p-8 text-center text-white">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 bg-linear-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Verify PIN
        </h2>

        <p className="text-slate-400 mb-6">
          Enter the 6-digit verification code
        </p>

        {/*  PIN Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {pin.map((digit, index) => (
            <Input
              key={index}
              id={`pin-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-xl font-semibold 
                         bg-slate-800/70 border-white/10 text-white 
                         shadow-md rounded-lg focus:ring-2 
                         focus:ring-orange-500 focus:border-orange-500"
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md">
          Verify
        </Button>
      </div>
    </div>
  );
};

export default Verify_pin;
