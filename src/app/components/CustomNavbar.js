"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Register from "./Register";
const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedIn"))) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <nav className="bg-transparent border-b-2 border-slate-400">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            data-collapse-toggle="navbar-multi-level"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-multi-level"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 hover:text-black text-slate-700 rounded md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 hover:text-black text-slate-700 md:border-0 md:p-0 md:w-auto"
                >
                  Stockes Services{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownNavbar"
                  className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        href="/additems"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Add Item Stocks
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Item Stocks
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Add Item
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show Item Stokes
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar1"
                  className="flex items-center justify-between w-full py-2 px-3 hover:text-black text-slate-700 md:border-0 md:p-0 md:w-auto"
                >
                  Receipt Services{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownNavbar1"
                  className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Add Receipt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Receipts
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show Receipts
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  href={"/aboutus"}
                  className="block py-2 px-3 hover:text-black text-slate-700 rounded md:border-0 md:p-0 "
                >
                  AboutUs
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 hover:text-black text-slate-700 rounded md:border-0 md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="">{isLoggedIn ? <Profile username={"GauravTeli"}  email={"gauravteli134@gmail.com"}/> : <Register />}</div>
        </div>
      </nav>
    </>
  );
};

export default CustomNavbar;

/*
<nav className="drop-shadow-2xl flex justify-between text-slate-200 bg-gray-700 rounded">
      <div>
        <ul className="flex font-semibold">
          <li className="py-3 px-3 hover:bg-white hover:text-gray-700 hover:underline underline-offset-8" ><Link href="/">HOME</Link></li>
          <li className="py-3 px-3 hover:bg-white hover:text-gray-700 hover:underline underline-offset-8"><Link href="/aboutus">ABOUTUS</Link></li>
          <li className="py-3 px-3 hover:bg-white hover:text-gray-700 hover:underline underline-offset-8"><Link href="#">CONTACTUS</Link></li>
          <li className="py-3 px-3 hover:bg-white hover:text-gray-700 hover:underline underline-offset-8"><Link href="#">EXTRA</Link></li>
        </ul>
      </div>
      <div>
      <ul className="flex font-semibold">
          <li className="py-3 px-3 hover:bg-white hover:text-gray-700 hover:underline underline-offset-8"><Link href="#">SIGNIN</Link></li>
          <li className="py-3 px-3 hover:bg-white hover:text-gray-700 hover:underline underline-offset-8"><Link href="#">REGISTER</Link></li>
        </ul>
      </div>
    </nav>
*/
