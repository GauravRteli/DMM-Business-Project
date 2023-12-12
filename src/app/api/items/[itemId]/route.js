import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
const ItemSchema = require("@/app/schemas/ItemSchema");
export async function DELETE(request, { params }) {
  await connectDb();
  console.log("request reached");
  const { itemId } = params;
  try {
    await ItemSchema.findByIdAndDelete(itemId);

    return NextResponse.json(
      { message: `Item Got deleted` },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured at server side" },
    { status: 500 }
  );
}
