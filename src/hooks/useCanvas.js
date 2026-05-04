import { useRef, useEffect } from "react"

export function useCanvas(noteId) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const originalSnapshot = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    originalSnapshot.current = null
  }, [noteId])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e, onStart) => {
    isDrawing.current = true
    lastPos.current = getPos(e)
    onStart?.()
  }

  const draw = (e, tool, penColor, penSize) => {
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const pos = getPos(e)

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : penColor
    ctx.lineWidth = tool === "eraser" ? 20 : penSize
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()

    lastPos.current = pos
  }

  const stopDrawing = () => {
    isDrawing.current = false
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    originalSnapshot.current = null
  }

  const saveSnapshot = () => {
    originalSnapshot.current = canvasRef.current.toDataURL("image/png")
  }

  const revertCanvas = () => {
    if (!originalSnapshot.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    img.src = originalSnapshot.current
  }

  const renderTextOnCanvas = (text) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#1a1a1a"
    ctx.font = "22px Georgia, serif"

    const padding = 32
    const lineHeight = 34
    const maxWidth = canvas.width - padding * 2
    const words = text.split(" ")
    let line = ""
    let y = padding + lineHeight

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " "
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, padding, y)
        line = words[i] + " "
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, padding, y)
  }

  const exportCanvas = () => canvasRef.current.toDataURL("image/png")

  return {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    saveSnapshot,
    revertCanvas,
    renderTextOnCanvas,
    exportCanvas,
  }
}