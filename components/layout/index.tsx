import React from "react";
import Navbar from "../nav-bar";

interface LayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='bg-indigo-50 h-screen flex flex-col'>
      <Navbar />
      <main className='relative flex-1 flex overflow-hidden'>{children}</main>
    </div>
  );
};

export default Layout;
