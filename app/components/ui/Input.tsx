"use client"

import React, { ChangeEvent, useState } from "react";
import { AppstoreOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  name: string;
  type?: 'password' | 'text';
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  showLink?: boolean;
  linkTitle?: string;
  linkSlug?: string;
  className?: string;
}

const Input = ({
  label,
  isRequired = false,
  type,
  showLink = false,
  name,
  linkTitle,
  linkSlug,
  placeholder,
  className,
  value,
  onChange
}: InputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {showLink && (
          <div className="text-sm">
            <a
              href={linkSlug}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {linkTitle}
            </a>
          </div>
        )}
      </div>
      <div className="relative">
        <input
          placeholder={placeholder}
          type={isPasswordVisible ? 'text' : type}
          value={value}
          onChange={onChange}
          name={name}
          autoComplete={"true"}
          // required={isRequired}
          className={`bg-gray-900 text-gray-200 outline-none indent-4 rounded-md border-0 py-1.5 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${className}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 -mt-4 flex items-center cursor-pointer"
          >
            {isPasswordVisible ? (
              <EyeOutlined />
            ) : (
              <EyeInvisibleOutlined />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
