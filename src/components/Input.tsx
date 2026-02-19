import { forwardRef, type InputHTMLAttributes } from "react";
import "../css/Input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return <input ref={ref} {...props} />;
  },
);

export default Input;
