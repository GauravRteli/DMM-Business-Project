import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const ReceiptDetails = ({ receipt, getAllReceipts }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formattedDate = new Date(receipt.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const deleteReceipt = async (id) => {
    console.log(id);
    const response = await axios.post("http://localhost:3000/api/receipts/delete",{
        receiptId: id
    });
    getAllReceipts();
    if (response.status === 200) {
      toast.success("Receipt Deleted SuccessFully !");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <Toaster
        containerStyle={{
          position: "relative",
        }}
      />
      <div className="max-w-5xl mx-auto bg-white rounded-md overflow-hidden shadow-md p-6 mb-6">
        {/* <h2 className="text-2xl font-semibold mb-4">Receipt Details</h2> */}
        <div className="mb-2">
          <strong className="font-semibold">Name of Customer:</strong>{" "}
          {receipt.nameOfCustomer}
        </div>
        <div className="mb-2">
          <strong className="font-semibold">City of Customer:</strong>{" "}
          {receipt.cityOfCustomer}
        </div>
        <div className="mb-2">
          <strong className="font-semibold">Date:</strong> {formattedDate}
        </div>
        {showDetails && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border border-gray-300">Item</th>
                  <th className="py-2 px-4 border border-gray-300">Quantity</th>
                  <th className="py-2 px-4 border border-gray-300">Price</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border border-gray-300">
                      {item.item.name} {"("} {item.item.brand} {")"}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {item.quantity} {item.item.unit}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      ₹{item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Charges:</h3>
          <div className="mb-2 bg-gray-100 p-3 rounded-md border border-gray-300">
            <strong className="font-semibold">GST:</strong>{" "}
            {receipt.charges.GST}%
          </div>
          <div className="mb-2 bg-gray-100 p-3 rounded-md border border-gray-300">
            <strong className="font-semibold">Package Charges:</strong> ₹
            {receipt.charges.packageCharges}
          </div>
          <div className="mb-2 bg-gray-100 p-3 rounded-md border border-gray-300">
            <strong className="font-semibold">Total Charges:</strong> ₹
            {receipt.charges.total}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Payment Status:</h3>
          <div
            className={`mb-2 p-3 rounded-md border ${
              receipt.paymentStatus.status === "paid"
                ? "border-green-500 bg-green-100"
                : "border-red-500 bg-red-100"
            }`}
          >
            <strong className="font-semibold">Status:</strong>{" "}
            {receipt.paymentStatus.status}
          </div>
          <div
            className={`mb-2 p-3 rounded-md border ${
              receipt.paymentStatus.status === "paid"
                ? "border-green-500 bg-green-100"
                : "border-red-500 bg-red-100"
            }`}
          >
            <strong className="font-semibold">Paid:</strong> ₹
            {receipt.paymentStatus.paid}
          </div>
        </div>
        <div>
          <strong className="font-semibold">Total:</strong> ₹{receipt.total}
        </div>
        <div className="flex justify-between">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Show Less Details" : "Show More Details"}
          </button>
          <div className="space-x-2">
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={() => setShowDetails(!showDetails)}
            >
              Edit
            </button>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => deleteReceipt(receipt._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptDetails;
