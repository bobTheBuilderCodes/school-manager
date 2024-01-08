



import { ChangeEvent, HTMLAttributes, ReactElement } from "react";

export interface InputProps extends HTMLAttributes<HTMLInputElement>{
    label?: string
    value: string 
    name: string
    placeholder?: string
    onChange: (e: ChangeEvent<HTMLInputElement>)=> void
    isRequired?: boolean
    showLink?: boolean
    linkTitle?: string
    linkSlug?: string
    width?: number

} 

const  Input = ({
  label,
  isRequired = false,
  showLink = false, name,
  linkTitle,
  linkSlug,
  placeholder,
  width = 96,
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
      <div className="mt-2">
        <input placeholder={placeholder}
         
          value={value}
          onChange={onChange}
          name={name}
          autoComplete={"true"}
          // required={isRequired}
          className={`w-full mb-5 indent-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />
      </div>
    </div>
  );
};

export default Input;
