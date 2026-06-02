import React, { useState } from "react";
import ButtonLoading from "../Components/ButtonLoading";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/baseURL";
import { useAllContext } from "../Contexts/AllContexts";
import { errorEmitter, successEmitter } from "../utils/emitter";
type NoteForm = {
  title: string;
  content: string;
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
function CreateNote() {
  let { user, setAllNotes, allNotes } = useAllContext();
  const [form, setForm] = useState<NoteForm>({
    title: "",
    content: "",
  });
  const onChangeFunc = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const createNote = async () => {
    try {
      setLoading(true);
      if (!form.title || !form.content) {
        errorEmitter("Title & Content both are required");
        return;
      }
      let response = await fetch(`${baseURL}/note/api/createnote/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      let noteData = await response.json();
      const newNote = noteData.note as Notes;

      if (noteData.success) {
        successEmitter(noteData.message);
        setAllNotes([...allNotes, newNote]);
        navigate("/");
      } else errorEmitter(noteData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="h-screen w-screen bg-violet-600 flex justify-center items-center">
        <div className="">
          <form
            className="flex border-pink-400 border-2 flex-col py-16 bg-gray-100 px-20 justify-center items-center gap-6 rounded-4xl"
            onSubmit={async (e) => {
              e.preventDefault();
              await createNote();
            }}
          >
            <h2 className="font-medium text-3xl">Create new note</h2>
            <p className=" text-gray-500 text-center font-medium">
              Create a new note <br /> and see all you want to remind yourself
            </p>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={onChangeFunc}
              className="border-black border-2 px-4 py-3 rounded-xl opacity-65"
              required
              placeholder="Enter Title..."
            />
            <textarea
              name="content"
              value={form.content}
              onChange={onChangeFunc}
              className="border-black border-2 px-10 py-4 rounded-xl opacity-65"
              required
              placeholder="Enter Content..."
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 px-16 transition hover:text-white font-medium py-3 rounded-2xl"
            >
              <>
                {" "}
                {loading ? (
                  <div className="flex gap-2">
                    Creating... <ButtonLoading />
                  </div>
                ) : (
                  "Create Note"
                )}
              </>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateNote;
