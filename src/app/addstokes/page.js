"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Select from "react-select";
import { getAllItems } from "@/app/utils/apiFunc";

const page = () => {
  const [itemsOptionsArray, setItemsOptionsArray] = useState([]);
  const [itemData, setItemData] = useState({
    itemId: null,
    quantity: 0,
    status: "buyedByOwner",
  });
  const id = Date.now().toString();
  const getItems = async () => {
    const itemsOptArray = await getAllItems();
    setItemsOptionsArray(itemsOptArray);
  };

  const AddStokes = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/stokes/addstokes",
      {
        ...itemData,
        itemId: itemData.itemId.value,
      }
    );
    if (response.status === 200) {
      toast.success("Successfully Added the Stokes !");
      setItemData({
        itemId: null,
        quantity: 0,
        status: "buyedByOwner",
      });
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <Toaster />
      <p className="mb-5 py-5 text-2xl font-bold border-b-2 border-slate-500">
        Add Stokes
      </p>
      <div className="w-2/5 m-auto my-10">
        <Select
          options={itemsOptionsArray}
          isSearchable
          value={itemData.itemId}
          onChange={(selectedValue) => {
            setItemData({
              ...itemData,
              itemId: selectedValue,
            });
          }}
          className="bg-gray-50 custom-select mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          classNamePrefix="custom-select"
          required
        />
        <div className="mb-5">
          <label
            htmlFor="number-inputq"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity
          </label>
          <input
            type="number"
            id="number-inputq"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={itemData.quantity}
            onChange={(e) =>
              setItemData({
                ...itemData,
                quantity: e.target.value,
              })
            }
            placeholder="90210"
            required
          />
        </div>
        <button
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          onClick={() => AddStokes()}
        >
          Add Stokes
        </button>
      </div>
    </div>
  );
};

export default page;
