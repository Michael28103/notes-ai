import { useState } from "react"
import Toolbar from "./Toolbar"
import { useCanvas } from "../hooks/useCanvas"
import { useOCR } from "../hooks/useOCR"

export default function DrawingCanvas({ noteId, onSave }) {
  const [penSize, setPenSize] = useState(3)
  const [penColor, setPenColor] = useState("#000000")
  const [tool, setTool] = useState("pen")
  const [saved, setSaved] = useState(false)
  const [converted, setConverted] = useState(false)

  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    saveSnapshot,
    revertCanvas,
    renderTextOnCanvas,
    exportCanvas,
  } = useCanvas(noteId)

  const { convert, converting } = useOCR()

  const handleClear = () => {
    clearCanvas()
    setSaved(false)
    setConverted(false)
  }

  const handleRevert = () => {
    revertCanvas()
    setConverted(false)
  }

  const handleConvert = async () => {
    saveSnapshot()
    const dataUrl = exportCanvas()
    const text = await convert(dataUrl)
    renderTextOnCanvas(text)
    setConverted(true)
  }

  const handleSave = () => {
    onSave(exportCanvas())
    setSaved(true)
  }

  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      <Toolbar
        tool={tool}
        setTool={setTool}
        penSize={penSize}
        setPenSize={setPenSize}
        penColor={penColor}
        setPenColor={setPenColor}
        converting={converting}
        converted={converted}
        saved={saved}
        onClear={handleClear}
        onRevert={handleRevert}
        onConvert={handleConvert}
        onSave={handleSave}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => startDrawing(e, () => { setSaved(false); setConverted(false) })}
        onMouseMove={(e) => draw(e, tool, penColor, penSize)}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="flex-1 border border-gray-200 rounded-xl cursor-crosshair bg-white"
        style={{ touchAction: "none" }}
      />
    </div>
  )
}
