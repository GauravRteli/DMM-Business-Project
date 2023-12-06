"use client";
import React, { useState } from "react";
import Link from "next/link";
import Profile from "@/app/components/Profile";
import Register from "@/app/components/Register";
import { AiOutlineCaretDown } from "react-icons/ai";

const Navbar = () => {
  const [menu1Open, setMenu1Open] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu1 = () => {
    setMenu1Open(!menu1Open);
    setMenu2Open(false);
  };
  const toggleMenu2 = () => {
    setMenu2Open(!menu2Open);
    setMenu1Open(false);
  };
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="p-4 flex justify-between border-b-2 border-slate-500 font-semibold">
      <div className="container mx-auto flex justify-between items-center">
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="#"
            className="block py-2 px-3 hover:text-black text-slate-700 rounded md:p-0"
          >
            Home
          </Link>
          <div className="">
            <button
              onClick={toggleMenu1}
              className="flex items-center space-x-1 py-2 px-3 hover:text-black text-slate-700 rounded md:p-0"
            >
              <div>Item Services</div>
              <AiOutlineCaretDown />
            </button>
            {menu1Open && (
              <div className="absolute mt-2 w-36 bg-white rounded p-2 text-center">
                <Link
                  href="/additems"
                  className="block border-b-2 px-2 py-1 rounded text-slate-700 hover:text-white hover:bg-slate-700 border-slate-300 "
                >
                  Add Items
                </Link>
                <Link
                  href="#"
                  className="block border-b-2 px-2 py-1 rounded text-slate-700 hover:text-white hover:bg-slate-700 border-slate-300"
                >
                  Show Items
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleMenu2}
              className="flex items-center space-x-1 py-2 px-3 hover:text-black text-slate-700 rounded md:p-0"
            >
              <div>Receipt Services</div>
              <AiOutlineCaretDown />
            </button>
            {menu2Open && (
              <div className="absolute mt-2 w-36 bg-white rounded p-2 text-center">
                <Link
                  href="#"
                  className="block border-b-2 px-2 py-1 rounded text-black hover:text-white hover:bg-slate-700 border-slate-300 "
                >
                  Add Items
                </Link>
                <Link
                  href="#"
                  className="block border-b-2 px-2 py-1 rounded hover:text-white hover:bg-slate-700 border-slate-300 text-black"
                >
                  Show Items
                </Link>
              </div>
            )}
          </div>
          <Link
            href="#"
            className="block py-2 px-3 hover:text-black text-slate-700 rounded md:p-0"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggler */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {/* You can use a hamburger icon or any other mobile menu icon */}
            &#9776;
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden space-y-2 absolute text-center top-36 left-0 bg-gray-800 p-2 rounded w-full">
            <Link href="#" className="block text-white">
              Home
            </Link>
            <div className="relative">
              <button
                onClick={toggleMenu1}
                className="text-white focus:outline-none"
              >
                Services
              </button>
              {menu1Open && (
                <div className="ml-4 bg-gray-700 p-2 rounded text-left">
                  <Link href="#" className="block text-white">
                    Service 1
                  </Link>
                  <Link href="#" className="block text-white">
                    Service 2
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleMenu2}
                className="text-white focus:outline-none"
              >
                Products
              </button>
              {menu2Open && (
                <div className="ml-4 bg-gray-700 p-2 rounded text-left">
                  <Link href="#" className="block text-white">
                    Product 1
                  </Link>
                  <Link href="#" className="block text-white">
                    Product 2
                  </Link>
                </div>
              )}
            </div>
            <Link href="#" className="block text-white">
              Contact
            </Link>
          </div>
        )}
      </div>
      <div className="">
        {isLoggedIn ? (
          <Profile username={"GauravTeli"} email={"gauravteli134@gmail.com"} />
        ) : (
          <Register />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
