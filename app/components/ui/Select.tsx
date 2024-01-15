import React from "react";

interface SelectProps {
  options: string[];
}

const Select = ({ options }: SelectProps) => {
  return (
    <select className="bg-gray-900 p-2 rounded-md outline-none">
      {options.map((option) => (
        <option className="text-gray-200" value={option} key={option}>
            {option}
            </option>
      ))}
    </select>
  );
};

export default Select;
