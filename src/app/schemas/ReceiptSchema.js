import mongoose from "mongoose";
const Item = require("@/app/schemas/ItemSchema");
const Schema = mongoose.Schema;
const ReceiptSchema = new mongoose.Schema({
  nameOfCustomer: { type: String, required: true },
  cityOfCustomer: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      // storing the refrence of the item object to build relation ship of one to many .
      item: {
        type: Schema.Types.ObjectId,
        ref: Item,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  charges: {
    GST: { type: Number, required: true },
    packageCharges: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  paymentStatus: {
    status: { type: Number, required: true },
    paid: { type: Number, required: true },
  },
  total: { type: Number, required: true },
});

var receiptsModel =
  mongoose.models.receipts || mongoose.model("receipts", ReceiptSchema);
module.exports = receiptsModel;
