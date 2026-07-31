import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "nav" | "black" | "red";
}

const variantStyles = {
  nav:
    "bg-amber-200 hover:bg-amber-400 active:bg-amber-300 disabled:hover:bg-amber-200 disabled:active:bg-amber-200",
  black:
    "bg-black hover:bg-black/70 active:bg-black/85 disabled:hover:bg-black disabled:active:bg-black text-white",
  red:
    "text-white bg-red-700 disabled:hover:bg-red-700 brightness-100 transition duration-300 ease-in-out hover:brightness-75",
};

const Button = ({
  children,
  variant = "nav",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${
        variantStyles[variant]
      } py-2 px-4 shadow-xl rounded-2xl select-none font-bold disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
