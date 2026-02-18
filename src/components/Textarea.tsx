import type { TextareaHTMLAttributes } from "react"
import "../css/Textarea.css"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea(props: TextareaProps) {
  return <textarea {...props}></textarea>
}