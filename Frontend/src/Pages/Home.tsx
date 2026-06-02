import { useEffect, useState } from "react";
import { baseURL } from "../utils/baseURL";
import Loader from "../Components/Loader";
import { useAllContext } from "../Contexts/AllContexts";
import NoteCard from "../Components/NoteCard";
import { useNavigate } from "react-router-dom";
import { Bug, DoorOpen, Plus, Send } from "lucide-react";
import { errorEmitter, successEmitter } from "../utils/emitter";

function Home() {
  const { user, allNotes, setAllNotes, setUser } = useAllContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const getAllNotes = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${baseURL}/note/api/getallnotes/${user._id}`);
      let notesData = await response.json();

      if (notesData.success) {
        setAllNotes(notesData.allNotes);
        successEmitter(notesData.message);
      } else if (notesData.redirect) {
        errorEmitter(notesData.message);
        navigate("/signup");
      } else errorEmitter(notesData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let fetchNotes = async () => {
      await getAllNotes();
    };
    fetchNotes();
  }, [user._id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="h-screen flex flex-col items-center py-12 gap-5 justify-startr w-screen bg-indigo-500">
          <h1
            style={{ WebkitTextStroke: "1.5px white" }}
            className="font-extrabold text-6xl text-pink-400"
          >
            All your notes
          </h1>
          {!user._id ? (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
              className="absolute flex gap-2 bg-green-500 text-white transition hover:bg-green-600 hover:translate-y-2 rounded-2xl px-10 py-3 items-center top-7 font-medium right-10"
            >
              Sign Up <Send className="h-5" />
            </span>
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("notesUser");
                setUser({
                  _id: "",
                  name: "",
                  email: "",
                  createdAt: "",
                  updatedAt: "",
                });
                navigate("/login");
              }}
              className="absolute flex gap-2 bg-red-600 text-white transition hover:bg-red-700 hover:translate-y-2 rounded-2xl px-10 py-3 items-center top-7 font-medium right-10"
            >
              Log Out <DoorOpen className="h-5" />
            </span>
          )}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/create")}
            className="absolute flex hover:translate-y-2 hover:bg-gray-500 transition hover:text-white bg-white rounded-2xl px-10 py-3 gap-2 items-center top-7 font-medium left-10"
          >
            Create Note <Plus className="h-5" />
          </span>
          <div className="w-full h-full flex justify-center items-center gap-6 flex-wrap px-12 py-6">
            {allNotes.length > 0 ? (
              allNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  _id={note._id}
                  title={note.title}
                  createdBy={note.createdBy}
                  content={note.content}
                />
              ))
            ) : (
              <div className="flex flex-col gap-4 h-20 items-center">
                <Bug className="font-extrabold h-50" />
                <p className="font-medium">
                  No notes found, create a note to manage and view your notes
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
