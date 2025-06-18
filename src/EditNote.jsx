import { useParams, useNavigate } from "react-router-dom";

import {useState} from "react";

function EditNote({notes, updateNote}){
    const{id} = useParams();
    const navigate = useNavigate();

    const note = notes.find((n) => n.id === parseInt(id));
    if(!note) return (<p>Page Not Found</p>)

        const [title, setTitle] = useState(note.title);
        const [content, setContent] = useState(note.content);

        const handleUpdate = () => {
            const updatedNote = {
                ...note, title, content
            };
            updateNote(updatedNote)
            navigate("/");
        };

        return(
            <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded shadow-md">
                 <h2 className="text-2xl font-bold text-gray-600 mb-4">Edit Note</h2>

                  <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        placeholder="Note Title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-40 px-4 py-2 mb-4 border border-gray-300 rounded"
        placeholder="Note Content"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
            </div>
        );
}

export default EditNote;