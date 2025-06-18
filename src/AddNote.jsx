import { useState } from "react";

import { useNavigate } from "react-router-dom";

function AddNote({addNote}){

    const [title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote({title, content});
        navigate("/");
    };

    return(
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded shadow-md">
            <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>

            <textarea className="w-full p-2 bg-blue-200 border-gray-300 rounded shadow-md" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required/>

            <button className="rounded p-2 bg-green-400 text-white font-md text-md">Save Note</button>
        </form>
    );

}

export default AddNote;