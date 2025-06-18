import { useParams, useNavigate } from "react-router-dom";

function DeleteNote({notes, deleteNote}){

    const {id} = useParams();
    const navigate = useNavigate();

    const note = notes.find(n => n.id === parseInt(id));
    if(!note) return(<p>Page Not Found</p>)

        const handleDeleteNote = () => {
            deleteNote(note.id);
            navigate("/");
        }
    return(
       <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold text-gray-600 mb-4">{note.title}</h2>
      <p className="border-gray-400 mb-6 text-gray-400 bg-white whitespace-pre-wrap">{note.content}</p>
      <div>
      <button onClick={handleDeleteNote} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
    );
}

export default DeleteNote;