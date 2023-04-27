import React, { ButtonHTMLAttributes } from "react";

interface ButtonPrimaryProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
}

function ButtonPrimary({
  text,
  onClick,
  className,
  ...props
}: ButtonPrimaryProp) {
  return (
    <button
      className={`bg-indigo-500 text-white p-2 rounded-lg disabled:contrast-75 disabled:brightness-75 hover:brightness-125 transition-[filter] duration-250  ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}

export default ButtonPrimary;
