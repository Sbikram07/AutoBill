import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useBill } from "@/context/billContext";
import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_SERVER_URL;

const Success = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const { exportBill, setDownloadTriggered } = useBill();

  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    // 1️⃣ Mark bill as paid
    fetch(`${baseUrl}/api/payment/mark-paid/${billId}`, {
      method: "PATCH",
      credentials: "include",
    });

    // 2️⃣ Auto-download bill
    exportBill(billId);
    setDownloadTriggered(true);

    // 3️⃣ Countdown + auto redirect
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirectTimer);
    };
  }, [billId, exportBill, navigate, setDownloadTriggered]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-4">
          Your bill has been downloaded successfully.
        </p>

        <p className="text-sm text-gray-500">
          Redirecting to home in{" "}
          <span className="font-semibold text-green-600">
            {secondsLeft}
          </span>{" "}
          seconds...
        </p>

        {/* Optional manual button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 
                     text-white font-semibold py-2 rounded-lg transition"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
};

export default Success;
