"use client";
import { useState } from "react";
import React from "react";
import profile1 from "../../../assets/profile1.jpg";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const [click, setClick] = useState(false);
  return (
    <div class="relative">
      <Image
        class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={profile1}
        alt="Bordered avatar"
        onClick={() => setClick(!click)}
      />
      {click ? <div class="absolute top-12 text-center justify-center" style={{
        left: "-75px"
      }}>
        <p class="text-gray-700 dark:text-gray-300 w-28 h-9 flex items-center justify-center bg-white rounded"><Link href={"/"} className="px-2 font-semibold">Log out {"->"}</Link></p>
      </div> : <></>}
    </div>
  );
};

export default Profile;
