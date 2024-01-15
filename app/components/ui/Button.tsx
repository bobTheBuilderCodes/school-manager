import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  title: string;
  type?: "submit" | "reset" | "button";
  clicked?: ()=>void
}

const Button = ({
  title,
  type = "submit",
  disabled = false,
  clicked,
  ...rest
}: ButtonProps) => {
  return (
    <div>
      <button
        disabled={disabled}
        type={type}
        {...rest}
        className=" flex w-full justify-center  leading-6  btn"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
