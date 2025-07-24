import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditNote({ notes, updateNote }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingNote = notes.find((n) => n.id === id);
  const [note, setNote] = useState(existingNote || { title: "", content: "" });

  if (!existingNote) {
    return (
      <div className="text-center mt-10 text-red-500 font-bold">
        Note not found.
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim()) {
      updateNote({ ...existingNote, title: note.title, content: note.content });
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-10 max-w-xl mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Note</h2>

      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="w-full px-3 py-2 mb-4 border rounded"
        required
      />

      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        className="w-full px-3 py-2 mb-4 border rounded h-40"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Note
      </button>
    </form>
  );
}

export default EditNote;
