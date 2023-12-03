"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-700 text-white rounded">
      <div className="md:flex justify-evenly items-start p-3 text-center">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <p className="font-semibold text-xl pb-3">Address</p>
          <p className="md:w-60 md:h-30 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem eveniet architecto at excepturi quam ipsam placeat</p>
        </div>
        <div>
        <p className="font-semibold text-xl pb-3">Contact</p>
          <div className="pb-3">
            <p>Gopal Teli</p>
            <p>9898394668</p>
          </div>
          <div>
            <p>Nagjiram Teli</p>
            <p>9427386121</p>
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-3">Copyright © 2023 DWARKESH METAL MART ®</div>
    </div>
  );
};

export default Footer;
