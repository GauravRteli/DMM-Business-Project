"use client";
import React, { useEffect, useState } from "react";
import { getAllItems } from "@/app/utils/apiFunc";
import ReceiptItem from "../components/ReceiptItem";
import { validateReceipt } from "../utils/formvalidation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
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
    paymentStatus: {
      status: "pending",
      paid: 0,
    },
    total: 0,
  });

  const countTotalCharges = (tot) => {
    var totalCharges =
      (tot * parseFloat(receiptData.charges.GST)) / 100 +
      parseFloat(receiptData.charges.packageCharges);
    return totalCharges;
  };
  const countTotal = (items) => {
    var tot = 0;
    items.map((item) => {
      tot += item.price * item.quantity;
    });
    var totalCharges = countTotalCharges(tot);
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
        total: parseFloat(totalCharges).toFixed(2),
      },
      total: parseFloat(tot),
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
        total: totalCharges.toFixed(2),
      },
      total: parseFloat(tot),
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

  const addReceipt = async () => {
    if (validateReceipt(receiptData)) {
      toast.success("The Receipt is Valid !");
      var updatedItemArray = Array.from(receiptData.items, (item) => {
        return {
          price: parseFloat(item.price),
          quantity: parseFloat(item.quantity),
          item: item.item.value,
        };
      });
      var updatedReceiptData = {
        ...receiptData,
        items: updatedItemArray,
        charges: {
          GST: parseFloat(receiptData.charges.GST),
          packageCharges: parseFloat(receiptData.charges.packageCharges),
          total: parseFloat(receiptData.charges.total),
        },
        paymentStatus: {
          status: "pending",
          paid: parseFloat(receiptData.paymentStatus.paid),
        },
        total: parseFloat(receiptData.total),
      };
      const response = await axios.post(
        "http://localhost:3000/api/receipts",
        updatedReceiptData
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.error(response.data.message);
      } else {
        toast.success("SuccessFully the Receipt is added ..!");
        resetReceiptData();
      }
    } else {
      toast.error("May any block is empty or their no items added !");
    }
  };

  const resetReceiptData = () => {
    setReceiptData({
      nameOfCustomer: "",
      cityOfCustomer: "",
      items: [],
      charges: {
        GST: 18,
        packageCharges: 0,
        total: 0,
      },
      paymentStatus: {
        status: "pending",
        paid: 0,
      },
      total: 0,
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
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
              aria-live="assertive"
              className={`bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                receiptData.nameOfCustomer === ""
                  ? "bg-red-200 border-red-500"
                  : ""
              }`}
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
              className={`bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                receiptData.cityOfCustomer === ""
                  ? "bg-red-200 border-red-500"
                  : ""
              } `}
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
              className={`bg-gray-50 col-span-2 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                receiptData.charges.GST === ""
                  ? "bg-red-200 border-red-500"
                  : ""
              } `}
              placeholder="GST Tax %"
              value={receiptData.charges.GST}
              onChange={(e) => {
                var totalCharges;
                if (
                  e.target.value === "" &&
                  receiptData.charges.packageCharges === ""
                ) {
                  totalCharges = 0;
                } else if (e.target.value === "") {
                  totalCharges =
                    0 + parseFloat(receiptData.charges.packageCharges);
                } else if (receiptData.charges.packageCharges === "") {
                  totalCharges = parseFloat(e.target.value);
                } else {
                  totalCharges =
                    parseFloat(receiptData.total * e.target.value) / 100 +
                    parseFloat(receiptData.charges.packageCharges);
                }

                setReceiptData({
                  ...receiptData,
                  charges: {
                    ...receiptData.charges,
                    GST: e.target.value,
                    total: parseFloat(totalCharges).toFixed(2),
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
              type="number"
              id="package"
              className={`bg-gray-50 col-span-2 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                receiptData.charges.packageCharges === ""
                  ? "bg-red-200 border-red-500"
                  : ""
              } `}
              placeholder="Package Charges"
              value={receiptData.charges.packageCharges}
              aria-describedby="helper-text-explanation"
              onChange={(e) => {
                var totalCharges;
                if (e.target.value === "") {
                  totalCharges =
                    parseFloat(receiptData.total * receiptData.charges.GST) /
                      100 +
                    0;
                } else {
                  totalCharges =
                    parseFloat(receiptData.total * receiptData.charges.GST) /
                      100 +
                    parseFloat(e.target.value);
                }
                setReceiptData({
                  ...receiptData,
                  charges: {
                    ...receiptData.charges,
                    packageCharges: e.target.value,
                    total: parseFloat(totalCharges).toFixed(2),
                  },
                });
              }}
              required
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
              {(
                parseFloat(receiptData.total) +
                parseFloat(receiptData.charges.total)
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mb-2">
          <p className="border-b-2 border-slate-400 py-2 text-center text-2xl font-bold mt-5">
            Payment
          </p>
          <div className="flex justify-between items-center py-4">
            <fieldset className="flex space-x-5 p-2">
              <label
                htmlFor="paymentstatus"
                className="block mr-2 text-lg font-bold text-gray-900 dark:text-white"
              >
                Payment Status :
              </label>
              <div className="flex items-center">
                <input
                  id="pending"
                  type="radio"
                  name="pending"
                  value={"pending"}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  checked={receiptData.paymentStatus.status === "pending"}
                  onChange={(e) => {
                    setReceiptData({
                      ...receiptData,
                      paymentStatus: {
                        ...receiptData.paymentStatus,
                        status: e.target.value,
                      },
                    });
                  }}
                />
                <label
                  htmlFor="pending"
                  className="block ms-2  text-lg font-bold text-gray-900 dark:text-gray-300"
                >
                  Pending
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  type="radio"
                  name="paid"
                  value={"paid"}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  checked={receiptData.paymentStatus.status === "paid"}
                  onChange={(e) => {
                    setReceiptData({
                      ...receiptData,
                      paymentStatus: {
                        ...receiptData.paymentStatus,
                        status: e.target.value,
                      },
                    });
                  }}
                />
                <label
                  htmlFor="paid"
                  className="block ms-2  text-lg font-bold text-gray-900 dark:text-gray-300"
                >
                  Paid
                </label>
              </div>
            </fieldset>
            <div className=" grid gap-4 grid-cols-3">
              <div className="col-span-1 flex justify-end items-center">
                <label
                  htmlFor="package"
                  className="block  text-right text-lg font-bold text-gray-900 dark:text-white"
                >
                  Total Amount Paid =
                </label>
              </div>
              <input
                type="number"
                id="package"
                className={`bg-gray-50 col-span-2 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  receiptData.paymentStatus.paid === ""
                    ? "bg-red-200 border-red-500"
                    : ""
                } `}
                value={receiptData.paymentStatus.paid}
                aria-describedby="helper-text-explanation"
                onChange={(e) => {
                  setReceiptData({
                    ...receiptData,
                    paymentStatus: {
                      ...receiptData.paymentStatus,
                      paid: e.target.value,
                    },
                  });
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t-2 border-dashed border-slate-400 py-4">
          <button
            type="button"
            className="text-white mb-5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={addReceipt}
          >
            Add Receipt +
          </button>
          <button
            type="button"
            className="text-white mb-5 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => resetReceiptData()}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReceipt;
