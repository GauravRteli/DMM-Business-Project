"use client";
import React, { useEffect, useState } from "react";
import Receipt from "../components/Receipt";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const ShowReceipt = () => {
  const [Receipts, setReceipts] = useState([]);

  const getAllReceipts = async () => {
    const response = await axios.get("http://localhost:3000/api/receipts");
    setReceipts(response.data);
  };
  useEffect(() => {
    console.log(Receipts);
  }, [Receipts]);
  useEffect(() => {
    getAllReceipts();
  }, []);

  return (
    <div>
      <Toaster
        containerStyle={{
          position: "relative",
        }}
      />
      <p className="text-3xl font-bold border-b-2 border-slate-400 mb-5 p-2 text-center">
        Receipts
      </p>
      {Receipts.map((receiptDetails, index) => {
        return (
          <Receipt
            key={receiptDetails._id}
            getAllReceipts={getAllReceipts}
            receipt={receiptDetails}
          />
        );
      })}
    </div>
  );
};

export default ShowReceipt;
