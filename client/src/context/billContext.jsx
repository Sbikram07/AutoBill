import { createContext, useContext, useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_SERVER_URL;

export const BillContext = createContext();

export const BillProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  // ⭐ Stores full bill (products, total_amount, etc.)
  const [billData, setBillData] = useState(null);

const [finished, setFinished] = useState(false);
const [downloadTriggered, setDownloadTriggered] = useState(false);


  // ----------------------------------------
  //  CREATE BILL
  // ----------------------------------------
  const createBill = async (data) => {
    try {
      const res = await fetch(`${baseUrl}/api/bill/create-bill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        // Store basic bill info
        setBillData({ _id: result.bill_id });
        setBillCreated(true);
        setFinished(true);

        return { success: true, bill_id: result.bill_id };
      }
      return { success: false, message: result.message };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  };

  // ----------------------------------------
  //  DETECT PRODUCT (with file)
  // ----------------------------------------
  const detectBasket = async (file) => {
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${baseUrl}/api/bill/detect-product`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const data = await res.json();

      // ⭐ Update billData when detection returns updated bill
      if (data.success && data.bill) {
        setBillData(data.bill);
      }

      return data;
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  };

  // ----------------------------------------
  //  EXPORT BILL
  // ----------------------------------------
  const exportBill = async (bill_id) => {
    try {
      const res = await fetch(`${baseUrl}/api/bill/export-bill/${bill_id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) return { success: false };

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `bill-${bill_id}.pdf`;
      link.click();

      setBillData(null);
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        customer_address: "",
      });
      setBillCreated(false);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  };

  // ----------------------------------------

  return (
    <BillContext.Provider
      value={{
        createBill,
        detectBasket,
        exportBill,
        formData,
        setFormData,
        billData,
        setBillData,
        finished,
        setFinished,
        downloadTriggered,
        setDownloadTriggered,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export const useBill = () => useContext(BillContext);
