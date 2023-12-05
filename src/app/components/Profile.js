"use client";
import { useState } from "react";
import React from "react";
import profile1 from "../../../assets/profile1.jpg";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";

const Profile = ({username, email}) => {
  const [click, setClick] = useState(false);
  return (
    <div class="relative cursor-pointer" onClick={() => setClick(!click)}>
      <div className="flex justify-center items-center">
        <Image
          class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={profile1}
          alt="Bordered avatar"
        />
        <AiOutlineCaretDown />
      </div>
      {click ? (
        <div class="absolute top-12 justify-center md:end-0">
          <ul className="text-gray-700 dark:text-gray-300 flex flex-col cursor-pointer p-4 font-semibold bg-white rounded">
            <li className="p-2 border-b-2 border-slate-200">
              <div>
                <p className="text-slate-700 text-xl font-bold">{username}</p>
                <p className="text-slate-600 text-sm">
                  {email}
                </p>
              </div>
            </li>
            <li className="my-2 p-2 rounded hover:bg-slate-700 hover:text-white ease-in-out duration-300 ">
              <Link className="py-12" href={"/"}>Log out {"->"}</Link>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
