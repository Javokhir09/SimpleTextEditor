import type { InputHTMLAttributes } from "react"
import "../css/Input.css"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export default function Input(props: InputProps) {
  return <input {...props} />
}