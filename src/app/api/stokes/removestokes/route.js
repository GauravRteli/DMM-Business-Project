const ItemSchema = require("@/schemas/ItemSchema");
import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";

export async function POST(request) {
  await connectDb();
  const { itemId, item_count } = await request.json();
  try {
    const item = await ItemSchema.findByIdAndUpdate(
      itemId,
      { $inc: { StokePresent: item_count*-1 } },
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
