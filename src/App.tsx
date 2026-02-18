import { useEffect, useState } from "react"
import Textarea from "./components/Textarea"

function App() {
  const [text, setText] = useState<string>("")

  useEffect(() => {
    const saved = localStorage.getItem("text")
    if (saved) {
      setText(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("text", text)
  }, [text])

  return (
    <>
      <Textarea 
        placeholder="Write your text here..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </>
  )
}

export default App
