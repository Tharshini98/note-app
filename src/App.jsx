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
      <Route path="/"         element={<Home notes={notes} updateNote={updateNote} />} />
      <Route path="/addNote"  element={<AddNote addNote={addNote} />} />
      <Route path="/edit/:id" element={<EditNote notes={notes} updateNote={updateNote} />} />
      <Route path="*"         element={
        <div style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          fontFamily: "var(--ff-display)",
          fontStyle: "italic",
          fontSize: "1.5rem",
          color: "var(--ink-muted)",
        }}>
          <span style={{ fontSize: "3rem" }}>🗺️</span>
          Page Not Found
        </div>
      } />
    </Routes>
  );
}

export default App;
