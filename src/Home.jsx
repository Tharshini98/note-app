import { useState } from "react";
import { Link } from "react-router-dom";

function Home({ notes =[] }) {

    return (
        <div className="m-6 px-4 py-2 bg-blue-200 border-blue-100 rounded shadow-lg">
            <nav className="flex items-center justify-center border-gray-200 shadow-md  p-6">
                <h1 className="font-bold text-blue-500 italic text-2xl p-2 rounded-sm">Note App</h1>
                </nav>
                
                <div className="text-center mt-4">
            <Link to="/addNote" className="bg-blue-500 font-bold text-white px-4 py-2 rounded transition">Add Note</Link>
            </div>
            <div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {notes.length == 0 && <p className="col-span-full text-center bg-white rounded border-white  shadow-lg text-gray-500">No Notes Added yet.</p>}
                {notes.map(note => (
                    <div key={note.id} to={`/note/${note.id}`} className=" bg-orange-300 p-4 rounded shadow transition">
                        <div>
                       <h3 className="font-bold text-lg text-gray-600 mb-2">{note.title}</h3>
                       <p className="text-gray-500 font-semibold text-sm line-clamp-4">{note.content}</p>
                       </div>
                       <div className="flex justify-between mt-auto space x-2">
                        <Link to={`/edit/${note.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-500 text-sm">
                        Edit
                        </Link>

                         <Link
                to={`/note/${note.id}`}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </Link>
              </div>
              </div>

                ))}
            </div>
            
            </div>
        </div>
    );
}

export default Home;