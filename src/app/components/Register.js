import React from "react";
import Link from "next/link";
const Register = () => {
  return (
    <div className="flex space-x-2">
      <Link href={"/signin"} className="flex items-center">
        <span className="self-center border-r-2 border-slate-500 pr-2 hover:text-blue-500 text-slate-700 text-md font-semibold whitespace-nowrap">
          SignIn
        </span>
      </Link>
      <a href="#" className="flex items-center">
        <span className="self-center hover:text-blue-500 text-md text-slate-700 font-semibold whitespace-nowrap">
          Register
        </span>
      </a>
    </div>
  );
};

export default Register;
