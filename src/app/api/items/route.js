import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
const ItemSchema = require("@/app/schemas/ItemSchema");

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
  const { name, type, brand, unit, noofpiecesperpacket } = await request.json();
  const item = new ItemSchema({
    name: name,
    type: type,
    brand: brand,
    unit: unit,
    noofpiecesperpacket: noofpiecesperpacket,
  });
  try {
    const itemCreated = await item.save();

    return NextResponse.json(itemCreated, {
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
export async function PUT(request) {
  // create a connection ....
  await connectDb();
  const {
    _id,
    name,
    type,
    brand,
    StokePresent,
    StokeSold,
    StokeBuyed,
    unit,
    noofpiecesperpacket,
  } = await request.json();
  try {
    var item;
    if (unit === "kg" || unit === "nos") {
      item = await ItemSchema.findByIdAndUpdate(_id, {
        name: name,
        type: type,
        brand: brand,
        StokePresent: StokePresent,
        StokeSold: StokeSold,
        StokeBuyed: StokeBuyed,
        unit: unit,
        noofpiecesperpacket: null,
      });
    } else {
      item = await ItemSchema.findByIdAndUpdate(_id, {
        name: name,
        type: type,
        brand: brand,
        StokePresent: StokePresent,
        StokeSold: StokeSold,
        StokeBuyed: StokeBuyed,
        unit: unit,
        noofpiecesperpacket: noofpiecesperpacket,
      });
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
export async function DELETE(request) {
  await connectDb();
  console.log("request reached");
  const { id } = await request.json();
  console.log(id);
  try {
    await ItemSchema.findByIdAndDelete(id);

    return NextResponse.json(
      { message: `Item (${id}) Got deleted` },
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
