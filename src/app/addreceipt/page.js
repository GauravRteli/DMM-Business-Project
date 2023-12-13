"use client";
import React, { useEffect, useState } from "react";
import { getAllItems } from "@/app/utils/apiFunc";
import Select from "react-select";
import ReceiptItem from "../components/ReceiptItem";
import { redirect } from "next/dist/server/api-utils";
const AddReceipt = () => {
  const [itemsOptArray, setItemsOptArray] = useState({
    items: [],
  });

  const [receiptData, setReceiptData] = useState({
    nameOfCustomer: "",
    cityOfCustomer: "",
    items: [],
    charges: {
      GST: 18,
      packageCharges: 0,
      total: 0,
    },
    total: 0,
  });
  const countTotal = (items) => {
    var tot = 0;
    items.map((item) => {
      tot += item.price * item.quantity;
    });
    var totalCharges =
      (tot * parseInt(receiptData.charges.GST)) / 100 +
      parseInt(receiptData.charges.packageCharges);
    console.log(totalCharges);
    return {
      tot: tot,
      totalCharges,
    };
  };
  const updateReceiptItemData = (idx, key, value) => {
    var updatingItems = receiptData.items;
    updatingItems[idx][key] = value;
    var total = updatingItems[idx].quantity * updatingItems[idx].price;
    total = total.toFixed(2);
    var { tot, totalCharges } = countTotal(updatingItems);
    tot = tot.toFixed(2);
    setReceiptData({
      ...receiptData,
      items: updatingItems,
      charges: {
        ...receiptData.charges,
        total: totalCharges,
      },
      total: tot,
    });
    return total;
  };
  const deleteReceiptItemData = (idx) => {
    var updatingItems = receiptData.items;
    var filteredItems = updatingItems.filter((item, index) => {
      if (index != idx) return item;
      else return null;
    });
    var { tot, totalCharges } = countTotal(updatingItems);
    tot = tot.toFixed(2);
    setReceiptData({
      ...receiptData,
      items: filteredItems,
      charges: {
        ...receiptData.charges,
        total: totalCharges
      },
      total: tot,
    });
  };
  const addBlankItem = () => {
    var updatingItems = receiptData.items;
    updatingItems.push({
      item: null,
      quantity: 0,
      price: 0,
    });
    setReceiptData({
      ...receiptData,
      items: updatingItems,
    });
  };
  const getItems = async () => {
    const itemsArray = await getAllItems();
    setItemsOptArray({
      items: itemsArray,
    });
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <form className=" max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label
              htmlFor="nameofcustomer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="nameofcustomer"
              value={receiptData.nameOfCustomer}
              onChange={(e) =>
                setReceiptData({
                  ...receiptData,
                  nameOfCustomer: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="cityofcustomer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer City
            </label>
            <input
              type="text"
              id="cityofcustomer"
              value={receiptData.cityOfCustomer}
              onChange={(e) =>
                setReceiptData({
                  ...receiptData,
                  cityOfCustomer: e.target.value,
                })
              }
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="text-white mb-5 bg-slate-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => addBlankItem()}
          >
            Add Item +
          </button>
        </div>
        <div className="grid grid-cols-10 text-center font-bold mb-2 border-b-2 border-dashed border-slate-400">
          <p className="col-span-3">Item Name</p>
          <p className="col-span-2">Quantity</p>
          <p className="col-span-2">Price</p>
          <p className="col-span-3">Total</p>
        </div>
        {receiptData.items.map((itemData, index) => {
          return (
            <ReceiptItem
              key={index}
              item={itemData}
              idx={index}
              updateReceiptItemData={updateReceiptItemData}
              deleteReceiptItemData={deleteReceiptItemData}
              itemsOptArray={itemsOptArray}
            />
          );
        })}
        <div className="grid grid-cols-6 gap-4 mb-2">
          <div className="col-span-3"></div>
          <div></div>
          <div className="font-bold flex items-center justify-end p-2 text-right text-lg">
            <p>Total = </p>
          </div>
          <div className="flex justify-center w-44 min-w-fit items-center bg-white text-green-500 border-2 border-slate-400 rounded font-bold">
            <p>{receiptData.total}</p>
          </div>
        </div>
        <div className="w-2/5 ml-auto border-b-2 border-slate-400 mb-2">
          <p className="border-b-2 border-slate-400 py-2 text-center text-2xl font-bold mt-5">
            Taxes Involved
          </p>
          <div className="my-2 grid gap-4 grid-cols-3">
            <div className="col-span-1 flex justify-end items-center">
              <label
                htmlFor="gst"
                className="block  text-right text-lg font-bold text-gray-900 dark:text-white"
              >
                GST (%) =
              </label>
            </div>
            <input
              type="number"
              id="gst"
              className="bg-gray-50 col-span-2 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={receiptData.charges.GST}
              onChange={(e) => {
                setReceiptData({
                  ...receiptData,
                  charges: {
                    ...receiptData.charges,
                    GST: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="my-2 grid gap-4 grid-cols-3">
            <div className="col-span-1 flex justify-end items-center">
              <label
                htmlFor="package"
                className="block  text-right text-lg font-bold text-gray-900 dark:text-white"
              >
                Package Charge (rupees) =
              </label>
            </div>
            <input
              type="text"
              id="package"
              className="bg-gray-50 col-span-2 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={receiptData.charges.packageCharges}
              onChange={(e) => {
                setReceiptData({
                  ...receiptData,
                  charges: {
                    ...receiptData.charges,
                    packageCharges: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="my-2 grid gap-4 grid-cols-3">
            <label
              htmlFor="totalcharges"
              className="block text-right text-lg font-bold text-gray-900 dark:text-white"
            >
              Total Charge (rupees) =
            </label>
            <div
              id="totalcharges"
              className="bg-gray-50 col-span-2 border border-gray-400 text-gray-900 text-sm rounded-lg w-full p-2.5"
            >
              <p>{receiptData.charges.total}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="col-span-1 font-bold flex items-center justify-end p-2 text-right text-lg">
            <p>Complete Total = </p>
          </div>
          <div className="flex w-44 min-w-fit col-span-2 justify-center items-center bg-white text-green-500 border-2 border-slate-400 rounded font-bold">
            <p>
              {parseInt(receiptData.total) +
                parseInt(receiptData.charges.total)}
            </p>
          </div>
        </div>
        <div className="flex justify-between border-t-2 border-dashed border-slate-400 py-4">
          <button
            type="button"
            className="text-white mb-5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Receipt +
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReceipt;
