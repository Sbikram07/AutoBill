import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useBill } from "@/context/billContext";
import { useEffect, useRef, useState } from "react";

const baseUrl = import.meta.env.VITE_SERVER_URL;
const REDIRECT_TIME = 10;

const Success = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const { exportBill, setDownloadTriggered } = useBill();

  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_TIME);
  const hasdownloaded = useRef(false); // single guard for everything
useEffect(() => {
  let cancelled = false;

  const finalizePayment = async () => {
    try {
     
      const res = await fetch(`${baseUrl}/api/payment/mark-paid/${billId}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to mark bill as paid");
        return;
      }

      if (cancelled) return;

      
      if (!hasdownloaded.current) {
        await exportBill(billId);
        setDownloadTriggered(true);
        hasdownloaded.current = true;
      }
    } catch (err) {
      console.error("Payment finalization error:", err);
    }
  };

  finalizePayment();

  return () => {
    cancelled = true;
  };
}, [billId]);


    useEffect(() => {
        if(secondsLeft==0){
            navigate("/dashboard");
            return ;
        }
        const timer=setTimeout(() => {
          setSecondsLeft((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
    },[secondsLeft,navigate]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-4">
          Your bill has been downloaded automatically.
        </p>

        <p className="text-sm text-gray-500">
          Redirecting to dashboard in{" "}
          <span className="font-semibold text-green-600">{secondsLeft}</span>{" "}
          seconds
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 
                     text-white font-semibold py-2 rounded-lg transition"
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
};

export default Success;
