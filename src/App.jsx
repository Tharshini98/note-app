import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import AddNote from "./AddNote";
import EditNote from "./EditNote";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      pinned: false,
      archived: false,
      trashed: false,
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const updateNote = (updatedNote) => {
    if (updatedNote.permanentlyDelete) {
      setNotes((prev) => prev.filter((note) => note.id !== updatedNote.id));
    } else {
      setNotes((prev) =>
        prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    }
  };

  return (
   
      <Routes>
        <Route path="/" element={<Home notes={notes} updateNote={updateNote} />} />
        <Route path="/addNote" element={<AddNote addNote={addNote} />} />
        <Route path="/edit/:id" element={<EditNote notes={notes} updateNote={updateNote} />} />
        <Route path="*" element={<p className="m-10 text-center text-red-600 font-bold">Page Not Found</p>} />
      </Routes>
   
  );
}

export default App;
