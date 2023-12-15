import ReceiptSchema from "@/app/schemas/ReceiptSchema";
import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
import axios from "axios";
import { checkConsistency, updateStokes } from "@/app/utils/utils";
const ItemSchema = require("@/app/schemas/ItemSchema");

export async function GET() {
  await connectDb();
  try {
    // .populate method is used to join the two table receipt and items .
    const receipts = await ReceiptSchema.find({})
      .populate({
        path: "items.item",
        model: ItemSchema,
      })
      .select("_id date items charges paymentStatus total");
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
  const {
    nameOfCustomer,
    cityOfCustomer,
    charges,
    paymentStatus,
    items,
    total,
  } = await request.json();
  console.log(items, total);
  try {
    // check whether the required quantity of items are present or not !
    var mp = new Map();
    items.map((i) => {
      mp.set(i.item.toString(), i.quantity);
    });
    const isConsistent = await checkConsistency(mp);

    if (!isConsistent.status) {
      return NextResponse.json(
        {
          message: "required Quantity is not present !",
          requiredItems: isConsistent.responseArray,
        },
        { status: 201 }
      );
    }

    // first remove the stokes from the items database .....
    items.map(async (i) => {
      try {
        await updateStokes(i.item, i.quantity, "removestokepresent");
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: "Error occured at server side" },
          { status: 500 }
        );
      }
    });
    const receipt = new ReceiptSchema({
      nameOfCustomer: nameOfCustomer,
      cityOfCustomer: cityOfCustomer,
      items: items,
      charges: charges,
      paymentStatus: paymentStatus,
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
  await connectDb();
  const {
    receiptId,
    nameOfCustomer,
    cityOfCustomer,
    paymentStatus,
    charges,
    items,
    total,
  } = await request.json();
  try {
    // first to check how much more items are needed
    const currReceipt = await ReceiptSchema.findById(receiptId)
      .populate({
        path: "items.item",
        model: ItemSchema,
      })
      .select("_id date items total");
    var mp = new Map();
    currReceipt.items.map((i) => {
      mp.set(i.item._id.toString(), i.quantity);
    });

    items.map((i) => {
      if (mp.has(i.item.toString())) {
        var currValue = mp.get(i.item.toString());
        mp.set(i.item.toString(), i.quantity - currValue);
      } else {
        mp.set(i.item.toString(), i.quantity - 0);
      }
    });

    const isConsistent = await checkConsistency(mp);

    if (!isConsistent.status) {
      return NextResponse.json(
        {
          message: "The Required Stock is not present ..!",
          requiredItems: isConsistent.responseArray,
        },
        { status: 201 }
      );
    }

    // then update the stokes of the item in the database ..... !

    mp.forEach(async (value, key) => {
      if (value < 0) {
        await updateStokes(key, value, "removestokepresent");
      } else {
        await updateStokes(key, -1 * value, "addstokepresent");
      }
    });

    // then update the receipt .... !
    const updatedReceipt = await ReceiptSchema.findByIdAndUpdate(
      receiptId,
      {
        nameOfCustomer: nameOfCustomer,
        cityOfCustomer: cityOfCustomer,
        items: items,
        charges: charges,
        paymentStatus: paymentStatus,
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

export async function DELETE(request) {
  const { receiptId } = await request.json();
  try {
    const receipt = await ReceiptSchema.findById(receiptId);

    receipt.items.forEach(async (i) => {
      await axios.post("http://localhost:3000/api/stokes/addstokes", {
        itemId: i.item.toString(),
        quantity: i.quantity,
        status: "returnedByCustomer"
      });
    });
    await ReceiptSchema.findByIdAndDelete(receiptId);
    return NextResponse.json(
      { message: "Delete the Receipt !" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Error Occured on server side !" },
    { status: 500 }
  );
}
