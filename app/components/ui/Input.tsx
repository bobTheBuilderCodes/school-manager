



import { ChangeEvent, HTMLAttributes, ReactElement } from "react";

export interface InputProps extends HTMLAttributes<HTMLInputElement>{
    label?: string
    value?: string 
    name: string
    type?: 'password' | 'text'
    placeholder?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>)=> void
    isRequired?: boolean
    showLink?: boolean
    linkTitle?: string
    linkSlug?: string
    className?: string
} 

const  Input = ({
  label,
  isRequired = false,
  type,
  showLink = false, name,
  linkTitle,
  linkSlug,
  placeholder,
  className,
  value , onChange
}: InputProps) => {



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
      <div className="">
        <input placeholder={placeholder}
         type={type}
          value={value}
          onChange={onChange}
          name={name}
          autoComplete={"true"}
          // required={isRequired}
          className={` bg-gray-900 text-gray-200 outline-none indent-4 rounded-md border-0 py-1.5 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${className}`}
        />
       
      </div>
    </div>
  );
};

export default Input;
