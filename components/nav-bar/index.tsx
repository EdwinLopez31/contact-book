import React from "react";
import NavLink from "./nav-link";
import ButtonPrimary from "../button/btn-primary";
const Navbar = () => {
  return (
    <nav className='w-full bg-gray-50/50 backdrop-blur-sm border-b h-16 p-6 flex items-center justify-between gap-4 shadow-sm'>
      <div className='flex justify-start text-xl gap-4'>
        <h1>Address Book</h1>
      </div>
    </nav>
  );
};

export default Navbar;
