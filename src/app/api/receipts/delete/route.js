import ReceiptSchema from "@/app/schemas/ReceiptSchema";
import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
import axios from "axios";

export async function POST(request) {
    await connectDb();
    const { receiptId } = await request.json();
    console.log(receiptId);
    try {
      const receipt = await ReceiptSchema.findById(receiptId);
  
      receipt.items.forEach(async (i) => {
        await axios.post("http://localhost:3000/api/stokes/addstokes", {
          itemId: i.item.toString(),
          quantity: i.quantity,
          status: "returnedByCustomer"
        });
      });
      await ReceiptSchema.findByIdAndDelete(receiptId);
      return NextResponse.json(
        { message: "Delete the Receipt !" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json(
      { message: "Error Occured on server side !" },
      { status: 500 }
    );
  }
  