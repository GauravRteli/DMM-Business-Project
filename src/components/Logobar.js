import React from "react";
import fbicon from "../../assets/fb-icon.png";
import instaicon from "../../assets/insta-icon.png";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import Image from "next/image";
const Logobar = () => {
  return (
    <div className="py-5 flex justify-between items-center px-4 md:px-0">
      <div>
        <div className="flex flex-col leading-none">
          <h1 className="font-serif m-0 font-extrabold tracking-widest text-4xl">
            DMM
          </h1>
          <span className="text-xs">Dwarkesh Metal Mart</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <a href="#" target="_blank"><TiSocialFacebookCircular size={30} /></a>
        <a href="#" target="_blank"><TiSocialInstagram size={30} /></a>
      </div>
    </div>
  );
};

export default Logobar;
