import React, { useState } from "react";
import Select from "react-select";

const ReceiptItem = ({ itemsOptArray,deleteReceiptItemData, idx, updateReceiptItemData, item }) => {
  const [total, setTotal] = useState(0);
  return (
    <div className="grid grid-cols-10 mb-2 space-x-2">
      <div className="col-span-3">
        {/* <label
          htmlFor="item"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          Item Name
        </label> */}
        <div className="flex items-center space-x-2">
          <p className="font-bold">
            {idx + 1}
            {"."}
          </p>
          <Select
            id="item"
            options={itemsOptArray.items}
            isSearchable
            value={item.item}
            onChange={(selectedValue) => {
              updateReceiptItemData(idx, "item", selectedValue);
            }}
            className="bg-gray-50  custom-select border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            classNamePrefix="custom-select"
            required
          />
        </div>
      </div>
      <div className="col-span-2">
        <input
          type="number"
          id="number-inputq"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border col-span-1 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={item.quantity}
          onChange={(e) => {
            var total = updateReceiptItemData(idx, "quantity", e.target.value);
            setTotal(total);
          }}
          placeholder="90210"
          required
        />
      </div>
      <div className="col-span-2">
        <input
          type="number"
          id="number-inputp"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={item.price}
          onChange={(e) => {
            var total = updateReceiptItemData(idx, "price", e.target.value);
            setTotal(total);
          }}
          placeholder="90210"
          required
        />
      </div>
      <div className="col-span-3 flex space-x-2">
        <input
          type="number"
          id="number-inputt"
          aria-describedby="helper-text-explanation"
          className="bg-gray-200 font-bold text-green-500 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={total}
          disabled
        />
        <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => deleteReceiptItemData(idx)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ReceiptItem;
