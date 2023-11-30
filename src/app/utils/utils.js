import axios from "axios";
const ItemSchema = require("@/app/schemas/ItemSchema");

export const checkConsistency = async (receiptItemsToUpdate) => {
  let currItems = await ItemSchema.find({});
  let mpOfItems = new Map();
  currItems.map((i) => {
    mpOfItems.set(i._id.toString(), [i.StokePresent, i.name]);
  });
  let responseArray = new Array();
  let flag = true;
  receiptItemsToUpdate.forEach((value, key) => {
    if (mpOfItems.has(key)) {
      if (value < 0 && mpOfItems.get(key)[0] < -1 * value) {
        // whether to give more items and to check whether the requirement can be full filled or not .
        responseArray.push(mpOfItems.get(key)[1]);
        flag = false;
      }
    }
  });
  return {
    status: flag,
    responseArray: responseArray,
  };
};

export const removeStokesFunc = async (itemId, quantity) => {
  const response = await axios.post(
    "http://localhost:3000/api/stokes/removestokes",
    {
      itemId: itemId,
      quantity: quantity,
    }
  );
  return response;
};

export const updateStokes = async (itemId, quantity) => {
  if (quantity > 0) {
    const response = await axios.post(
      "http://localhost:3000/api/stokes/addstokes",
      {
        itemId: itemId,
        quantity: quantity,
      }
    );
    return response;
  } else {
    const response = await removeStokesFunc(itemId, quantity * -1);
    return response;
  }
};
