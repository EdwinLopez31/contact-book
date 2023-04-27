import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  withLabel?: boolean;
}

function InputField({
  labelText,
  id,
  type,
  onChange,
  value,
  className,
  withLabel = true,
  ...props
}: InputFieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      {withLabel && <label htmlFor={id}>{labelText}</label>}
      <input
        {...props}
        type={type ?? "text"}
        id={id}
        className={`p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-800 text-gray-800 ${className}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputField;
