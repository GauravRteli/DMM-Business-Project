const ItemSchema = require("@/app/schemas/ItemSchema");
import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";

export async function POST(request) {
  await connectDb();
  const { itemId, quantity, status } = await request.json();
  try {
    var item = await ItemSchema.findByIdAndUpdate(
      itemId,
      { $inc: { StokePresent: quantity } },
      { new: true }
    );
    if (item == null) {
      return NextResponse.json(
        { message: "item not found ..!" },
        {
          status: 201,
        }
      );
    }
    if (status === "buyedByOwner") {
      item = await ItemSchema.findByIdAndUpdate(
        itemId,
        { $inc: { StokeBuyed: quantity } },
        { new: true }
      );
    }
    return NextResponse.json(item, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured at server side" },
    { status: 500 }
  );
}
