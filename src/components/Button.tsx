import type { ButtonHTMLAttributes } from "react";
import "../css/Button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button className={["btn", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </button>
  );
}
