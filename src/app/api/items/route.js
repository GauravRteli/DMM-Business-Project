import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
const ItemSchema = require("@/schemas/ItemSchema");

// Get All items ....
export async function GET() {
  // create a connection ....
  await connectDb();
  const items = await ItemSchema.find({});
  return NextResponse.json(items, { status: 200 });
}
export async function POST(request) {
  // create a connection ....
  await connectDb();
  const { name, type, unit } = await request.json();
  const item = new ItemSchema({
    name: name,
    type: type,
    unit: unit,
  });
  try {
    const itemCreated = await item.save();

    return NextResponse.json(
      { itemCreated },
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
export async function PUT(request) {
  // create a connection ....
  await connectDb();
  const { _id, name, type, StokePresent, StokeSold, StokeBuyed, unit } =
    await request.json();
  try {
    const item = await ItemSchema.findByIdAndUpdate(_id, {
      name: name,
      type: type,
      StokePresent: StokePresent,
      StokeSold: StokeSold,
      StokeBuyed: StokeBuyed,
      unit: unit,
    });
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
export async function DELETE(request) {
  await connectDb();
  const { _id } = await request.json();

  try {
    const item = await ItemSchema.findByIdAndDelete(_id);

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
