import mongoose, { Schema } from "mongoose";
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  StokePresent: {
    type: Number,
    default: 0.0,
  },
  StokeSold: {
    type: Number,
    default: 0.0,
  },
  StokeBuyed: {
    type: Number,
    default: 0.0,
  },
  unit: {
    type: String,
    required: true,
  },
  
},{ timestamps: true });

var ItemModel = mongoose.models.items || mongoose.model('items', ItemSchema);

module.exports = ItemModel;
