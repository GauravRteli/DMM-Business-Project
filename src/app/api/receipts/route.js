import mongoose from "mongoose";
import ReceiptSchema from "@/schemas/ReceiptSchema";
import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
const Item = require("@/schemas/ItemSchema");

export async function GET() {
  await connectDb();
  try {
    // .populate method is used to join the two table receipt and items .
    const receipts = await ReceiptSchema.find({})
      .populate({
        path: "items.item",
        model: Item,
      })
      .select("_id date items total");
    console.log(receipts);
    return NextResponse.json(receipts, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured on server side !" },
    { status: 500 }
  );
}

export async function POST(request) {
  await connectDb();
  const { items, total } = await request.json();
  console.log(items, total);
  try {
    const receipt = new ReceiptSchema({
      items: items,
      total: total,
    });
    const createdReceipt = await receipt.save();
    return NextResponse.json(createdReceipt, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured at server side" },
    { status: 500 }
  );
}

export async function PUT(request) {
  const { receiptId, items, total } = await request.json();
  try {
    const updatedReceipt = await ReceiptSchema.findByIdAndUpdate(
      receiptId,
      {
        items: items,
        total: total,
      },
      { new: true }
    );
    return NextResponse.json(updatedReceipt, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured at server side" },
    { status: 500 }
  );
}
