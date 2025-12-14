module.exports = function billTemplate(bill) {
  const paymentStatus = bill.payment?.status || "pending";
  const isPaid = paymentStatus === "paid";

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Invoice - ${bill._id}</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 25px;
        }

        h1, h2, h3 {
            text-align: center;
            margin: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .customer-details {
            margin-bottom: 15px;
            font-size: 14px;
        }

        .payment-status {
            text-align: center;
            margin: 15px 0;
            padding: 10px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
        }

        .paid {
            background-color: #e6fffa;
            color: #065f46;
            border: 1px solid #10b981;
        }

        .pending {
            background-color: #fff7ed;
            color: #9a3412;
            border: 1px solid #fb923c;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th, td {
            border: 1px solid #444;
            padding: 8px;
            font-size: 14px;
            text-align: left;
        }

        th {
            background: #eee;
        }

        .total {
            text-align: right;
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>

<body>

    <div class="header">
        <h1>AutoBill Supermarket</h1>
        <p>Smart Billing System with AI Basket Detection</p>
    </div>

    <div class="customer-details">
        <p><strong>Bill ID:</strong> ${bill._id}</p>
        <p><strong>Date:</strong> ${new Date(
          bill.createdAt
        ).toLocaleString()}</p>
        <p><strong>Customer:</strong> ${bill.customer_name}</p>
        <p><strong>Address:</strong> ${bill.customer_address}</p>
        ${
          bill.customer_phone
            ? `<p><strong>Phone:</strong> ${bill.customer_phone}</p>`
            : ""
        }
        ${
          bill.customer_email
            ? `<p><strong>Email:</strong> ${bill.customer_email}</p>`
            : ""
        }
    </div>

    <!-- PAYMENT STATUS -->
    <div class="payment-status ${isPaid ? "paid" : "pending"}">
        Payment Status: ${isPaid ? "PAID" : "PENDING"}
        ${
          isPaid && bill.payment?.paidAt
            ? `<br/>Paid On: ${new Date(bill.payment.paidAt).toLocaleString()}`
            : ""
        }
    </div>

    <table>
        <thead>
            <tr>
                <th>Sl No</th>
                <th>Item</th>
                <th>Rate (₹)</th>
                <th>Qty</th>
                <th>Subtotal (₹)</th>
            </tr>
        </thead>

        <tbody>
            ${bill.products
              .map(
                (p, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${p.product_name}</td>
                    <td>${p.product_price}</td>
                    <td>${p.quantity}</td>
                    <td>${p.product_price * p.quantity}</td>
                </tr>`
              )
              .join("")}
        </tbody>
    </table>

    <div class="total">
        Grand Total: ₹${bill.total_amount}
    </div>

    <div class="footer">
        <p>Thank you for shopping with us!</p>
        <p>
          ${
            isPaid
              ? "Payment successfully received via Stripe"
              : "Please complete payment to finalize this bill"
          }
        </p>
        <p>Powered by AutoBill AI</p>
    </div>

</body>
</html>
`;
};
