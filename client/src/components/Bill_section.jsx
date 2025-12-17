import { useBill } from "@/context/billContext";
import React from "react";

const baseUrl = import.meta.env.VITE_SERVER_URL;

const Bill_section = () => {
  const {
    formData,
    billData,
    finished,
  } = useBill();

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/payment/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          billId: billData._id,
          amount: billData.total_amount || 0,
        }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.log(`checkout error:${error}`);
    }
  };

  // STEP 1: decide what to show
  const customer_name =
    billData?.customer_name || formData.customer_name || "---";

  const customer_phone =
    billData?.customer_phone || formData.customer_phone || "---";

  const customer_email =
    billData?.customer_email || formData.customer_email || "---";

  const customer_address =
    billData?.customer_address || formData.customer_address || "---";

  const products = billData?.products || [];
  const downloadDisabled = !finished;
  return (
    <div
      className="w-full max-w-xl mx-auto p-5
                 rounded-xl shadow-lg border border-white/10
                 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 
                 text-white backdrop-blur-md"
    >
      <h2
        className="text-2xl font-bold tracking-wide mb-4 
                   bg-linear-to-r from-orange-400 to-yellow-400 
                   bg-clip-text text-transparent"
      >
        Bill Summary
      </h2>

      {/* Customer Details */}
      <div className="space-y-3 text-slate-300">
        <p className="text-sm">
          Customer Name:{" "}
          <span className="font-semibold text-white">{customer_name}</span>
        </p>

        <p className="text-sm">
          Phone:{" "}
          <span className="font-semibold text-white">{customer_phone}</span>
        </p>

        <p className="text-sm">
          Email:{" "}
          <span className="font-semibold text-white">{customer_email}</span>
        </p>

        <p className="text-sm">
          Address:{" "}
          <span className="font-semibold text-white">{customer_address}</span>
        </p>

        {/* Items Section */}
        <div className="border-t border-white/10 pt-4">
          <p className="text-lg font-semibold mb-2">Items:</p>

          {/* BEFORE PREDICTION */}
          {products.length === 0 ? (
            <p className="text-slate-400">No items added yet...</p>
          ) : (
            <div className="space-y-2">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm border-b border-white/10 pb-1"
                >
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="text-white font-semibold">
                    ₹{item.subtotal}
                  </span>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between pt-3 text-lg font-bold">
                <span>Total</span>
                <span>₹{billData?.total_amount || 0}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-4">
       
        <button
          disabled={!finished}
          className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 
                     transition text-white font-semibold shadow-md"
          onClick={handleCheckout}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Bill_section;
