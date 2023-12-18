import React from "react";
import FounderImage1 from "../../../assets/NagjiramTeli.jpg"; // Import the image file for founder 2
import FounderImage2 from "../../../assets/GopalTeli.jpg"; // Import the image file for founder 1
import businessimg from "../../../assets/busishop.svg"; // Import the image file for founder 1
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-semibold mb-4 border-b-2 border-slate-400 px-4 py-1">
        About Us
      </h1>
      <div className="flex flex-col p-10 space-x-10 md:flex-row items-center justify-center mb-8">
        <div className="mb-4 md:mr-4 text-center">
          <Image
            src={FounderImage1}
            alt="Founder 1"
            className="rounded-full w-40 h-40 transform hover:scale-110 transition-transform duration-300 ease-in-out object-cover border-2 border-gray-500 p-1"
          />
          <h2 className="text-xl font-semibold mt-2">Nagjiram Teli</h2>
          <p className="text-gray-600">Founder</p>
        </div>
        <div className="mb-4 text-center">
          <Image
            src={FounderImage2}
            alt="Founder 2"
            className="rounded-full w-40 h-40 transform hover:scale-110 transition-transform duration-300 ease-in-out object-cover border-2 border-gray-500 p-1"
          />
          <h2 className="text-xl font-semibold mt-2">Gopal Teli</h2>
          <p className="text-gray-600">Co-Founder</p>
        </div>
      </div>
      <div className="text-lg text-left max-w-5xl m-auto">
        <p className="border-b-2 mb-5 border-slate-400 p-4">
          Welcome to DWARKESH METAL MART, where excellence meets innovation.
          Established in [Year of establishment], we take pride in being a
          leading provider of high-quality metal products. Our founders, Gopal
          Teli and Nagjiram Teli, bring a wealth of experience and passion to
          the industry.
        </p>
        <p className="mb-5 border-b-2 border-slate-400 p-4">
          At DWARKESH METAL MART, we are committed to delivering exceptional
          service and top-notch products to our valued customers. Our diverse
          range of offerings caters to Wholesale market, providing solutions
          that meet the highest standards of quality and durability.
        </p>
        <p className="text-center">
          At DWARKESH METAL MART Wholesale, our mission is to be the cornerstone
          of success for businesses across industries.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
