import { forwardRef, type TextareaHTMLAttributes } from "react";
import "../css/Textarea.css";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    return <textarea ref={ref} {...props} />;
  },
);

export default Textarea;
