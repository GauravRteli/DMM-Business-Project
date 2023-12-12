"use client";
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import EditForm from "./EditForm";
import DeleteCompo from "./DeleteComponent";
import StockInfoBlock from "./StokeInfo";
const ItemTableRow = ({ item, updateItemArray, setViewItem }) => {
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isStokeInfoPopupOpen, setStokeInfoPopupOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  return (
    <>
      <tr className="hover:bg-gray-100 text-center transition duration-300 border-t border-gray-200">
        <td className="py-3 px-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
              {item.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">{item.brand}</p>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">{item.type}</td>
        <td className="py-3 px-4">{item.unit}</td>
        <td className="py-3 px-4">
          {item.noofpiecesperpacket ? item.noofpiecesperpacket : "-"}
        </td>
        <td>
          {isEditPopupOpen && (
            <EditForm
              editingItem={editingItem}
              setEditPopupOpen={setEditPopupOpen}
              updateItemArray={updateItemArray}
            />
          )}
          {isDeletePopupOpen && (
            <DeleteCompo
              deletingItem={editingItem}
              setDeletePopupOpen={setDeletePopupOpen}
              updateItemArray={updateItemArray}
            />
          )}

          <div className=" space-x-1 flex">
            <button 
            onClick={() => setViewItem(item)}
            className="border-2 cursor-pointer rounded-md px-2 py-1 items-center transition duration-300 flex justify-center border-blue-500 text-center hover:bg-blue-500 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12a3 3 0 016 0 3 3 0 01-6 0z"
                />
              </svg>
            </button>

            <button
              className="border-2 cursor-pointer rounded-md px-2 py-1 items-center transition duration-300 flex justify-center border-green-500 text-center hover:bg-green-500 hover:text-white"
              id={item._id}
              onClick={(e) => {
                setEditPopupOpen(true);
                setEditingItem(item);
              }}
            >
              <CiEdit />
            </button>
            <button
              className="border-2 px-2 py-1 cursor-pointer transition duration-300 rounded-md flex justify-center border-red-500 hover:bg-red-500 hover:text-white"
              onClick={(e) => {
                setDeletePopupOpen(true);
                setEditingItem(item);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ItemTableRow;
