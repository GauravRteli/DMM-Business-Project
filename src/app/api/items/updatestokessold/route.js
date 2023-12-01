import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
const ItemSchema = require("@/app/schemas/ItemSchema");

export async function PUT(request) {
  await connectDb();
  const { itemId, quantity, status } = await request.json();
  try {
    var item;
    
    if (status === "buyedByCustomer") {
      item = await ItemSchema.findByIdAndUpdate(
        itemId,
        { $inc: { StokeSold: quantity } },
        { new: true }
      );
    } else if (status === "returnedByCustomer") {
      item = await ItemSchema.findByIdAndUpdate(
        itemId,
        { $inc: { StokeSold: -1 * quantity } },
        { new: true }
      );
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured on server side ..!" },
    { status: 200 }
  );
}
