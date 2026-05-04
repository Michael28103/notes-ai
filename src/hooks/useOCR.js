import { useState } from "react"

export function useOCR() {
  const [converting, setConverting] = useState(false)

  const convert = async (dataUrl) => {
    setConverting(true)
    try {
      const res = await fetch("http://localhost:5001/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      })
      const data = await res.json()
      return data.text || "No text detected."
    } catch {
      return "Error connecting to OCR server."
    } finally {
      setConverting(false)
    }
  }

  return { convert, converting }
}