import {Routes, Route} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./Home";
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";
import EditNote from "./EditNote";

function App(){

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  },[])

  useEffect (() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes]);

  const addNote = (note) => {
    setNotes([...notes , { id: Date.now(), ...note }])
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

   const updateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };
  return(
<div>
 
<Routes>
   <Route path="/" element={<Home notes={notes} />} />
     <Route path="/addNote" element={<AddNote addNote={addNote} />} />
             <Route path="/note/:id" element={<DeleteNote notes={notes} deleteNote={deleteNote} />} />
              <Route path="/edit/:id" element={<EditNote notes={notes} updateNote={updateNote} />} />

</Routes>
</div>
  )
}

export default App;