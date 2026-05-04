export default function Sidebar({ notes, activeNote, onSelect, onCreate, onDelete }) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <img src="/favicon-light.svg" alt="App logo" className="w-8 h-8" />
            <h1 className="text-lg font-semibold">Notes AI</h1>
          </div>
          <button
            onClick={onCreate}
            className="w-full py-2 px-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            + New note
          </button>
        </div>
  
        <div className="flex-1 overflow-y-auto">
          {notes.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-8 px-4">
              No notes yet. Create one!
            </p>
          )}
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => onSelect(note.id)}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                activeNote === note.id ? "bg-gray-100" : ""
              }`}
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{note.title}</p>
                <p className="text-xs text-gray-400">{note.createdAt}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(note.id) }}
                className="text-gray-300 hover:text-red-400 text-lg leading-none transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
  