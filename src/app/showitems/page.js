"use client";
import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import axios from "axios";
import { metalOptions } from "../utils/formvalidation";
import Select from "react-select";
import { GrClose } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { filterItems } from "@/app/utils/filterITems";

const ShowItems = () => {
  const [itemsArray, setItemsArray] = useState({
    items: null,
  });
  const [originalItemArray, setOriginalItemArray] = useState({
    items: null,
  });
  const [filterType, setFilterType] = useState(null);
  const [options, setOptions] = useState(metalOptions);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const getItems = async () => {
    const response = await axios.get("http://localhost:3000/api/items");
    console.log(response.data);
    setOriginalItemArray({
      items: response.data,
    });
    setItemsArray({
      ...itemsArray,
      items: response.data,
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (filterType !== null && filterType.value === "brand") {
        // duplicates involved should be removed and lowercase comparision should be done !
      const uniqueBrandSet = new Set(
        itemsArray.items.map((item) => {
          return { value: item.brand, label: item.brand };
        })
      );
      const uniqueBrandArray = Array.from(uniqueBrandSet);
      setOptions(uniqueBrandArray);
    } else if (filterType !== null && filterType.value === "type") {
      setOptions(metalOptions);
    }
    setSelectedValue(null);
  }, [filterType]);

  const handleFilter = () => {
    if (filterType === null) {
      toast.error("Select the Filter Type !");
    } else if (selectedValue === null) {
      toast.error(`Select the ${filterType.value} !`);
    } else {
      const filteredItemsArray = filterItems(
        filterType.value,
        selectedValue.value,
        originalItemArray.items
      );
      setItemsArray({
        items: filteredItemsArray,
      });
    }
  };

  return (
    <div>
      <Toaster />
      <div>
        <button
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <GrClose /> : "Filter"}
        </button>
      </div>
      {open ? (
        <div className="border-b-2 border-slate-500">
          <div className="grid grid-cols-3 my-3 gap-2 md:gap-4">
            <Select
              options={options}
              isSearchable
              value={selectedValue}
              onChange={(selectedValue) => {
                setSelectedValue(selectedValue);
              }}
              className="bg-gray-50 col-span-2 custom-select mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              classNamePrefix="custom-select"
              required
            />
            <Select
              options={[
                {
                  value: "type",
                  label: "type",
                },
                {
                  value: "brand",
                  label: "brand",
                },
              ]}
              value={filterType}
              isSearchable={false}
              onChange={(selectedValue) => {
                setFilterType(selectedValue);
              }}
              className="bg-gray-50 col-span-1 custom-select mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              classNamePrefix="custom-select"
              required
            />
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 m-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              onClick={handleFilter}
            >
              Apply Filter
            </button>
            <button
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 m-auto font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              onClick={() => {
                setItemsArray(originalItemArray);
              }}
            >
              Remove Filter
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <table className="min-w-full bg-white shadow-md my-5 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Stock Present</th>
            <th className="py-2 px-4 border-b">Stock Sold</th>
            <th className="py-2 px-4 border-b">Stock Bought</th>
            <th className="py-2 px-4 border-b">Unit</th>
            <th className="py-2 px-4 border-b">pieces per packet</th>
          </tr>
        </thead>
        <tbody>
          {itemsArray.items?.map((item) => {
            return <Item key={item._id} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowItems;
