const ItemSchema = require("@/app/schemas/ItemSchema");
import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";

export async function POST(request) {
  await connectDb();
  const { itemId, quantity } = await request.json();
  console.log("removestokes", itemId, quantity);
  try {
    const itemToChange = await ItemSchema.findById(itemId);
    if (itemToChange.StokePresent < quantity) {
      return NextResponse.json(
        {
          message:
            "The Item`s stokes the less then the no of stocks to be removed !",
        },
        {
          status: 201,
        }
      );
    } else {
      const item = await ItemSchema.findByIdAndUpdate(
        itemId,
        { $inc: { StokePresent: quantity * -1 } },
        { new: true }
      );
      return NextResponse.json(item, {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured at server side" },
    { status: 500 }
  );
}
