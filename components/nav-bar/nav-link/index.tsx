import React from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

const NavLink = ({ href, text, icon }: NavLink) => {
  return (
    <Link href={href} className='flex gap-2 items-center'>
      <span>{icon}</span>
      {text}
    </Link>
  );
};

export default NavLink;
