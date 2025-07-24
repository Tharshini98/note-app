import { Link } from "react-router-dom";
import { useState } from "react";

function Home({ notes = [], updateNote }) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes
    .filter((note) => {
      if (filter === "pinned") return note.pinned && !note.trashed;
      if (filter === "archived") return note.archived && !note.trashed;
      if (filter === "trashed") return note.trashed;
      return !note.trashed;
    })
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const togglePin = (note) => updateNote({ ...note, pinned: !note.pinned });
  const toggleArchive = (note) => updateNote({ ...note, archived: !note.archived });
  const moveToTrash = (note) => updateNote({ ...note, trashed: true });
  const restoreFromTrash = (note) => updateNote({ ...note, trashed: false });
  const deletePermanently = (note) => updateNote({ ...note, permanentlyDelete: true });

  return (
    <div className="m-6 px-4 py-2 bg-blue-200 border-blue-100 rounded shadow-lg">
      <nav className="flex flex-col sm:flex-row items-center justify-between border-gray-200 shadow-md p-6 gap-2">
        <h1 className="font-bold text-blue-500 italic text-2xl">Note App</h1>
        <div className="flex gap-2">
          <Link to="/addNote" className="bg-blue-500 font-bold text-white px-4 py-2 rounded">Add Note</Link>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 rounded border"
          />
          <select
            className="rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pinned">Pinned</option>
            <option value="archived">Archived</option>
            <option value="trashed">Trash</option>
          </select>
        </div>
      </nav>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNotes.length === 0 && (
          <p className="col-span-full text-center bg-white rounded shadow text-gray-500">No Notes Found.</p>
        )}

        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-orange-300 p-4 rounded shadow">
            <h3 className="font-bold text-lg text-gray-600 mb-2">{note.title}</h3>
            <p className="text-gray-700 font-semibold text-sm whitespace-pre-wrap">{note.content}</p>
            <div className="flex justify-between mt-4 gap-1 flex-wrap">
              {!note.trashed ? (
                <>
                  <button onClick={() => togglePin(note)} className="bg-yellow-400 text-white px-3 py-1 rounded text-sm">
                    {note.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button onClick={() => toggleArchive(note)} className="bg-purple-500 text-white px-3 py-1 rounded text-sm">
                    {note.archived ? "Unarchive" : "Archive"}
                  </button>
                  <Link to={`/edit/${note.id}`} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Edit
                  </Link>
                  <button onClick={() => moveToTrash(note)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Trash
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => restoreFromTrash(note)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Restore
                  </button>
                  <button onClick={() => deletePermanently(note)} className="bg-red-700 text-white px-3 py-1 rounded text-sm">
                    Delete Permanently
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
