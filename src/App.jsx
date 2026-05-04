import { useState } from "react"
import Sidebar from "./components/Sidebar"
import DrawingCanvas from "./components/DrawingCanvas"

export default function App() {
  const [notes, setNotes] = useState([])
  const [activeNote, setActiveNote] = useState(null)

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Note ${notes.length + 1}`,
      canvas: null,
      createdAt: new Date().toLocaleDateString(),
    }
    setNotes([newNote, ...notes])
    setActiveNote(newNote.id)
  }

  const saveCanvas = (id, dataUrl) => {
    setNotes(notes.map(n => n.id === id ? { ...n, canvas: dataUrl } : n))
  }

  const deleteNote = (id) => {
    const remaining = notes.filter(n => n.id !== id)
    setNotes(remaining)
    setActiveNote(remaining.length > 0 ? remaining[0].id : null)
  }

  const active = notes.find(n => n.id === activeNote)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        notes={notes}
        activeNote={activeNote}
        onSelect={setActiveNote}
        onCreate={createNote}
        onDelete={deleteNote}
      />
      <div className="flex-1 overflow-y-auto">
        {active ? (
          <DrawingCanvas
            key={active.id}
            noteId={active.id}
            onSave={(dataUrl) => saveCanvas(active.id, dataUrl)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Select a note or create a new one
          </div>
        )}
      </div>
    </div>
  )
}
