import { Trash } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAllContext } from "../Contexts/AllContexts";
import { baseURL } from "../utils/baseURL";
import { errorEmitter, successEmitter } from "../utils/emitter";
import { useState } from "react";
type Props = {
  _id: string;
  title: string;
  content: string;
  createdBy: User;
};
type Notes = {
  _id: string;
  title: string;
  content: string;
  createdBy: User;
};
type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
function NoteCard({ _id, title, content, createdBy }: Props) {
  let { user, allNotes, setAllNotes } = useAllContext();
  const [delNote, setDelNote] = useState<boolean>(false);
  const deleteNote = async () => {
    try {
      setDelNote(true);
      let response = await fetch(
        `${baseURL}/note/api/deletenote/${_id}/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      let deleteNoteData = await response.json();

      const deletedNote = deleteNoteData.note as Notes;
      if (deleteNoteData.success) {
        successEmitter(deleteNoteData.message);
        setAllNotes(allNotes.filter((note) => note._id != deletedNote._id));
      } else errorEmitter(deleteNoteData.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        style={{
          animation: `${delNote ? "deleteNote 0.3s linear forwards" : "none"}`,
        }}
        className="flex relative gap-6 items-center bg-white rounded-4xl h-auto w-auto flex-col px-12 py-12"
      >
        <span className="text-gray-400 text-xs absolute top-2 right-6">
          Author : {createdBy.name ? createdBy.name : "Author Unavailable"}
        </span>
        <h1 className="text-indigo-600">
          {title ? title : "Loading Title..."}
        </h1>
        <p className="px-4 text-wrap text-center">
          {content ? content.slice(0, 61) + "..." : "Loading Content..."}
        </p>
        <div className="flex items-center justify-between px-4">
          <NavLink to={`/onenote/${_id}`}>
            <span className="text-gray-700 absolute bottom-6 left-6">
              View More
            </span>
          </NavLink>
          <span
            onClick={async () => {
              await deleteNote();
            }}
            className="absolute bottom-6 right-6"
          >
            <Trash className="text-red-600 h-5" />
          </span>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
