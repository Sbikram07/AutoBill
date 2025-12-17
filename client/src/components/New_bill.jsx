import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBill } from "../context/BillContext";

const New_bill = () => {
  const { createBill ,formData,setFormData,setFinished} = useBill();
  const [open, setOpen] = useState(false);

  
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create Bill
  const handleCreateBill = async () => {
    if (!formData.customer_name.trim()) {
      alert("Customer name is required!");
      return;
    }

    const res = await createBill(formData);

    if (res?.success) {
      alert("Bill Created Successfully!");
      setOpen(false); // Close modal
      // setFormData({
      //   customer_name: "",
      //   customer_email: "",
      //   customer_phone: "",
      //   customer_address: "",
      // });
    } else {
      alert("Failed to create bill!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
          + New Bill
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-md bg-slate-900/80 text-white border border-white/10 backdrop-blur-xl shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Create New Bill
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400">
            Fill the customer details for creating a bill.
          </DialogDescription>
        </DialogHeader>

        {/* Form Fields */}
        <div className="space-y-4 py-2">
          {/* Customer Name */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Customer Name *
            </label>
            <Input
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              placeholder="Enter customer name"
              className="mt-1 bg-slate-800/70 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Customer Email */}
          <div>
            <label className="text-sm font-medium text-slate-300">Email</label>
            <Input
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              placeholder="Enter customer email"
              className="mt-1 bg-slate-800/70 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Phone Number
            </label>
            <Input
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 bg-slate-800/70 border-white/10 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Address *
            </label>
            <Textarea
              name="customer_address"
              value={formData.customer_address}
              onChange={handleChange}
              placeholder="Enter address"
              className="mt-1 bg-slate-800/70 border-white/10 text-white placeholder:text-slate-400 resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            onClick={() =>{handleCreateBill()
              setFinished(false)}

            }
            className="bg-orange-600 hover:bg-orange-700 text-white shadow-md"
          >
            Save Bill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default New_bill;
