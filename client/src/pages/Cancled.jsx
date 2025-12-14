import React from "react";
import { XCircle } from "lucide-react";

const Canceled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-6">
          Something went wrong. Please try the payment again.
        </p>

        <button
          onClick={() => window.history.back()}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Canceled;
