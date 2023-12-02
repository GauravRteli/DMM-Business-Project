"use client";
import React from "react";
import businessBanner from "../../assets/busishop.svg";
import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <div
      className="grid grid-cols-3"
      style={{
        height: "42rem",
      }}
    >
      <div className="flex flex-col justify-center items-start space-y-8 col-span-2">
        <p className="text-7xl font-extrabold">
          Dwarkesh Metal Mart
          <span className="font-semibold text-4xl">,Nadiad</span>
        </p>
        <button
          type="button"
          className="text-white ease-in-out bg-slate-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          <Link href={"/home"} className="space-x-1 flex justify-around">
              <p>Sign In</p>{" "}
              <p className="hover:translate-x-1 duration-300 ease-in-out">
                {"->"}
              </p>
          </Link>
        </button>
      </div>
      <div className="col-span-1 flex justify-center">
        <Image src={businessBanner} />
      </div>
    </div>
  );
};

export default Home;
