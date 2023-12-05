"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const AddItems = () => {
  const [itemData, setItemData] = useState({
    name: "",
    type: "United States",
    brand: "",
    unit: "kg",
    noofpiecesperpacket: 0,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(itemData);
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
                name: e.target.value,
              })
            }
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
                brand: e.target.value,
              })
            }
          />
        </div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Item Type
        </label>
        <select
          id="item-type"
          value={itemData.type}
          onChange={(e) =>
            setItemData({
              ...itemData,
              type: e.target.value,
            })
          }
          className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>France</option>
          <option>Germany</option>
        </select>

        <fieldset>
          <legend className="sr-only">Countries</legend>

          <div className="flex items-center mb-4">
            <input
              id="country-option-1"
              type="radio"
              name="countries"
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
              name="countries"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setItemData({
                  ...itemData,
                  noofpiecesperpacket: e.target.value,
                })
              }
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
