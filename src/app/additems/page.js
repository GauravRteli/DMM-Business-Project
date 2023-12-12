"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { metalOptions } from "../utils/formvalidation";
import axios from "axios";
import Select from "react-select";

const AddItems = () => {
  const [itemData, setItemData] = useState({
    name: "",
    type: null,
    brand: "",
    unit: "kg",
    noofpiecesperpacket: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/items", {
      ...itemData,
      type: itemData.type.value,
    });
    if (response.status === 500) {
      toast.error(response.data.message);
    } else {
      toast.success("SuccessFully Added the item !");
      setItemData({
        name: "",
        type: null,
        brand: "",
        unit: "kg",
        noofpiecesperpacket: 0,
      });
      console.log(response.data);
    }
  };
  return (
    <div className="">
      <Toaster />
      <div className="px-4 mb-5 text-3xl border-b-2 border-slate-500 py-4">
        <p className="font-extrabold">Add Items</p>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Item Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={itemData.name}
            onChange={(e) => 
              setItemData({
                ...itemData,
                name: e.target.value.trim(),
              })
            }
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="item-brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Item Brand
          </label>
          <input
            type="text"
            id="item-brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={itemData.brand}
            onChange={(e) =>
              setItemData({
                ...itemData,
                brand: e.target.value.trim(),
              })
            }
            required
          />
        </div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Item Type
        </label>
        <Select
          options={metalOptions}
          isSearchable
          value={itemData.type}
          onChange={(selectedValue) => {
            setItemData({
              ...itemData,
              type: selectedValue,
            });
          }}
          className="bg-gray-50 custom-select mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          classNamePrefix="custom-select"
          required
        />
        <fieldset>
          <div className="flex items-center mb-4">
            <input
              id="country-option-1"
              type="radio"
              name="kg"
              value="kg"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  unit: e.target.value,
                })
              }
              checked={itemData.unit === "kg"}
            />
            <label
              htmlFor="country-option-1"
              className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              KG
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="country-option-2"
              type="radio"
              name="nos"
              value="nos"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  unit: e.target.value,
                })
              }
              checked={itemData.unit === "nos"}
            />
            <label
              htmlFor="country-option-1"
              className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              No. Pieces
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="country-option-3"
              type="radio"
              name="countries"
              value="packets"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  unit: e.target.value,
                })
              }
              checked={itemData.unit === "packets"}
            />
            <label
              htmlFor="country-option-1"
              className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Packets
            </label>
          </div>
        </fieldset>
        {itemData.unit === "packets" ? (
          <div class="mb-5">
            <label
              htmlFor="numberInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter a No Of Pieces Per Packet:
            </label>
            <input
              id="numberInput"
              type="number"
              min={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  noofpiecesperpacket: e.target.value,
                })
              }
              required
              value={itemData.noofpiecesperpacket}
            />
          </div>
        ) : (
          <></>
        )}

        <button
          type="submit"
          className="text-white mb-5 bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add +
        </button>
      </form>
    </div>
  );
};

export default AddItems;
