const ItemSchema = require("@/app/schemas/ItemSchema");
import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";

export async function POST(request) {
  await connectDb();
  const { itemId, quantity } = await request.json();
  try {
    const item = await ItemSchema.findByIdAndUpdate(
      itemId,
      { $inc: { StokePresent: quantity } },
      { new: true }
    );
    return NextResponse.json(item, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({message: "Error occured at server side"}, { status: 500 });
}
