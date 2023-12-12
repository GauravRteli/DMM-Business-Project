"use client";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const DeleteCompo = ({ deletingItem, setDeletePopupOpen, updateItemArray }) => {
  const handleDelete = async (e) => {
    const input = { id: deletingItem._id };
    console.log(input);
    const response = await axios.delete(
      `http://localhost:3000/api/items/${input.id}`
    );
    if (response?.status === 500) {
      toast.error(response.data.message);
    } else {
      console.log(response.data.message);
      const res = await axios.get("http://localhost:3000/api/items");
      updateItemArray(res.data);
      setDeletePopupOpen(false);  
      toast.success("SuccessFully Deleted the item !");
    }
  };

  return (
    <div className="absolute top-0 text-left left-0 w-full h-full flex items-center justify-center">
      <Toaster />
      <div className="rounded flex flex-col space-y-3 justify-center items-center bg-white w-2/5 p-6 shadow-2xl">
        <p className="text-2xl">
          Delete Item{" "}
          <span className="font-bold text-red-500">{deletingItem.name}</span>
        </p>
        <div className="flex space-x-2">
          <button
            type="button"
            className="text-white mb-5 bg-red-500 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </button>
          <button
            type="button"
            className="text-white mb-5 bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setDeletePopupOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCompo;
