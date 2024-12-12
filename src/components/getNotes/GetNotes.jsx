import { useContext, useState } from "react";
import { instance } from "../../axios";
// components
import NotesList from "./NotesList";
import Loader from "../../components/Loader";
//style
import "./Skeleton.css";
import NotesContext from "../../context/NotesContext";

export default function GetNotes({ setIsConnected }) {
  const [showOption, setShowOption] = useState({ isActive: false, id: null });
  const { notes, notesLoding, setNotes ,setShowAddNoteModal , showAddNoteModal } = useContext(NotesContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };



  const handleRemoveNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setNotes((prev) => prev.filter((el) => el.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-[60px] ">
    <h1 className="text-center text-red-500">Gestion des Notes</h1>
    <div className="flex flex-col p-[60px] ">
      <table className="w-[80%] m-auto max-w-[1000px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white
        
        uppercase bg-green-500 dark:bg-[#1a1a1a] dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              title
            </th>
            <th>note</th>
            <th>Shared with</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes && (
            <Loader loading={notesLoding} type="notes">
              {notes.map((el) => (
                <>
                  {console.log("render")}
                  
                  <NotesList
                    key={el.id}
                    el={el}
                    handleRemoveNote={handleRemoveNote}
                    setShowOption={setShowOption}
                    showOption={showOption}
                  />
                </>
              ))}
            </Loader>
          )}
        </tbody>
      </table>
      <div className="flex  h-[300px] justify-between ">
      <button className="bg-green-500 max-w-[120px] h-[50px] text-white" onClick={() => setShowAddNoteModal(!showAddNoteModal)}>
          Set Note
        </button>
        <button className="bg-red-500 max-w-[120px]  h-[50px] text-white" onClick={handleLogout}>Log Out</button>
      </div>
      </div>
    </div>
  );
}
