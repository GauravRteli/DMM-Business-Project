"use client";
import Link from "next/link";
import React, { useState } from "react";
import signinpng from "../../assets/signinpng.png";
import Image from "next/image";
import axios from "axios";
const signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3000/api/signin",{
      email:email,
      password:password
    });
    console.log(response);
  }
  return (
    <div>
      <p className="font-extrabold px-4 text-4xl border-b-2 border-slate-500 py-4">
        SignIn
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex justify-center col-span-2">
          <Image src={signinpng} alt={"Login Image"} className="h-6/7 w-4/5" />
        </div>
        <form className="px-8 py-4 md:px-0 col-span-1 my-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value) }
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value) }
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value) }
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default signin;
