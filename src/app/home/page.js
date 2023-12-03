"use client";
import Image from "next/image";
import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import { getCookie } from "../utils/cookiesservices";
// Flowbite
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedIn"))) {
      console.log("loggedin");
      console.log(getCookie("authToken"));
    } else {
    }
  }, []);

  return (
    <div className="homesidebar flex justify-center items-center p-4 gap-4">
      <div className="flex items-center">
        <p className="text-7xl font-extrabold">
          Dwarkesh Metal Mart
          <span className="font-semibold text-4xl">,Nadiad</span>
        </p>
      </div>
    </div>
  );
}
