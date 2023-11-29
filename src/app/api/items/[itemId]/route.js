import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
const ItemSchema = require("@/schemas/ItemSchema");
export async function GET(request, { params }) {
  await connectDb();
  const { itemId } = params;
  try {
    const item = await ItemSchema.findById(itemId);
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error occured at server side" },
    { status: 500 }
  );
}
