import React from "react";

const StockInfoBlock = ({viewItem}) => {
  return (
    <div className="bg-gray-200 shadow-md sticky top-5 flex left-2 min-w-96 justify-between p-4 rounded-md">
      <div className="">
        <div className="">
          <span className="mr-2 text-gray-600">Item Name:</span>
          <span className="text-black font-bold">{viewItem ? viewItem.name : "-"}</span>
        </div>
      </div>
      <div className="">
        <div className="">
          <span className="mr-2 text-gray-600">Stock Present:</span>
          <span className="text-blue-600 font-semibold">{viewItem ? viewItem.StokePresent + " " + viewItem.unit : "-"}</span>
        </div>
      </div>

      <div className="">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Stock Bought:</span>
          <span className="text-green-600 font-semibold">{viewItem ? viewItem.StokeBuyed + " " + viewItem.unit : "-"}</span>
        </div>
      </div>

      <div className="">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Stock Sold:</span>
          <span className="text-red-600 font-semibold">{viewItem ? viewItem.StokeSold + " " + viewItem.unit : "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default StockInfoBlock;
