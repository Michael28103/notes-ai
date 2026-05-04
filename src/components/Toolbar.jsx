export default function Toolbar({
    tool,
    setTool,
    penSize,
    setPenSize,
    penColor,
    setPenColor,
    converting,
    converted,
    saved,
    onClear,
    onRevert,
    onConvert,
    onSave,
  }) {
    return (
      <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-xl flex-wrap">
        <button
          onClick={() => setTool("pen")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tool === "pen" ? "bg-white shadow text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          Pen
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tool === "eraser" ? "bg-white shadow text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          Eraser
        </button>
  
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Size</label>
          <input
            type="range" min="1" max="20" value={penSize}
            onChange={(e) => setPenSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-500 w-4">{penSize}</span>
        </div>
  
        <input
          type="color" value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-gray-300"
        />
  
        <button
          onClick={onClear}
          className="text-sm font-medium text-red-400 hover:text-red-600 transition-colors"
        >
          Clear
        </button>
  
        <div className="ml-auto flex gap-2">
          {converted && (
            <button
              onClick={onRevert}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Revert
            </button>
          )}
          <button
            onClick={onConvert}
            disabled={converting}
            className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {converting ? "Converting..." : "Convert to text"}
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>
    )
  }
  