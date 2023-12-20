import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white w-full shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-col leading-none">
              <h1 className="font-serif m-0 font-extrabold tracking-widest text-4xl">
                DMM
              </h1>
              <span className="text-xs">Dwarkesh Metal Mart</span>
            </div>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/aboutus" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Dwarkesh Metal Mart ,Nadiad™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
