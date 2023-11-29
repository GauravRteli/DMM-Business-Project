import mongoose from "mongoose";
const Item = require("@/schemas/ItemSchema")
const Schema = mongoose.Schema;
const ReceiptSchema = new mongoose.Schema({
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
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

var receiptsModel =
  mongoose.models.receipts || mongoose.model("receipts", ReceiptSchema);
module.exports = receiptsModel;
