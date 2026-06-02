import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../utils/baseURL";
import { useAllContext } from "../Contexts/AllContexts";
import { errorEmitter, successEmitter } from "../utils/emitter";
import ButtonLoading from "../Components/ButtonLoading";
import { getRealDate } from "../utils/DateFormat";
import Loader from "../Components/Loader";

function Onenote() {
  const { user, allNotes, setAllNotes } = useAllContext();
  let param = useParams();
  const [tempTitle, setTitle] = useState<string>("");
  let [prevTitle, setPrevTitle] = useState<string>(tempTitle.toString());
  const [tempContent, setContent] = useState<string>("");
  let [prevContent, setPrevContent] = useState<string>(tempContent.toString());
  const [author, setAuthor] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [openModal, setopenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const getNote = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        `${baseURL}/note/api/getnote/${param.noteId}/${user._id}`,
      );
      let noteData = await response.json();

      if (noteData.success) {
        successEmitter(noteData.message);
        setTitle(noteData.note.title);
        setContent(noteData.note.content);
        setPrevContent(noteData.note.content);
        setPrevTitle(noteData.note.title);
        setAuthor(noteData.note.createdBy.name);
        setDate(noteData.note.createdAt);
      } else errorEmitter(noteData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const editNote = async (): Promise<boolean> => {
    try {
      setBtnLoading(true);
      let response = await fetch(
        `${baseURL}/note/api/updatenote/${param.noteId}/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: tempTitle,
            content: tempContent,
          }),
        },
      );
      let editData = await response.json();

      if (editData.success) {
        successEmitter(editData.message);
        setAllNotes(
          allNotes.map((note) => {
            if (note._id == param.noteId) {
              note.title = tempTitle;
              note.content = tempContent;
            }
            return note;
          }),
        );
        setPrevContent(tempContent);
        setPrevTitle(tempTitle);
        return true;
      } else {
        errorEmitter(editData.message);
        setTitle(prevTitle);
        setContent(prevContent);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setBtnLoading(false);
      setopenModal(false);
    }
  };
  useEffect(() => {
    let fetchNote = async () => {
      await getNote();
    };
    fetchNote();
    if (prevContent.length > 0) {
      setPrevContent(tempContent);
      setPrevTitle(tempTitle);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className=" h-screen w-screen flex justify-center items-center bg-orange-400 px-6 py-6">
          {openModal && (
            <div className="absolute  z-40 flex items-center justify-center  rounded-2xl border-pink-400 border-2 bg-violet-400 opacity-100 top-20 bottom-20 left-60 right-60">
              <form
                className="gap-6 flex flex-col justify-center items-center"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await editNote();
                }}
              >
                <div className="flex flex-col justify-start ">
                  <label htmlFor="title" className="font-medium">
                    *Change Title
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="py-2 px-4 bg-white border-black border-2 rounded-xl"
                    value={tempTitle}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col justify-start ">
                  <label htmlFor="content" className="font-medium">
                    *Change Content
                  </label>
                  <textarea
                    id="content"
                    className="py-6 bg-white px-16 border-black border-2 rounded-xl"
                    value={tempContent}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    required
                  ></textarea>
                </div>
                <div className="flex w-100 justify-between">
                  <button
                    type="reset"
                    disabled={btnLoading}
                    onClick={() => {
                      setopenModal(false);
                      setTitle(prevTitle);
                      setContent(prevContent);
                    }}
                    className="bg-red-500 rounded-2xl px-10 py-3 font-medium text-xl transition hover:bg-red-600 border-blue-600 border-2 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={btnLoading}
                    type="submit"
                    className="bg-green-500 rounded-2xl px-10 py-3 font-medium text-xl transition hover:bg-green-600 border-blue-600 border-2 hover:text-white"
                  >
                    {btnLoading ? (
                      <>
                        <div className="flex gap-2 items-center">
                          Changing... <ButtonLoading />
                        </div>
                      </>
                    ) : (
                      "Change"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="relative text-wrap h-[95%] max-w-[95%] overflow-x-hidden  overflow-y-auto px-10 flex flex-col items-center gap-20 wrap-break-words md:px-12 whitespace-pre-wrap py-24 bg-white rounded-3xl">
            <h1 className="text-6xl font-bold">
              {tempTitle ? (
                tempTitle
              ) : (
                <>
                  {" "}
                  <div className="flex gap-5 text-wrap text-center">
                    Loading Title...
                  </div>
                </>
              )}
            </h1>
            <>
              <div className="">
                <p className="text-4xl wrap-break-words md:px-12 whitespace-pre-wrap px-6 font-medium text-wrap max-w-full overflow-x-hidden text-center">
                  {tempContent ? (
                    tempContent
                  ) : (
                    <>
                      {" "}
                      <p className="flex gap-5">Loading Content...</p>
                    </>
                  )}
                </p>
              </div>
            </>

            <span className="flex w-150 justify-between">
              <button
                disabled={btnLoading}
                className="bg-violet-600 transition hover:bg-violet-700 rounded-2xl text-white px-10 py-3 font-medium border-2 border-pink-400"
                onClick={() => {
                  setopenModal(true);
                }}
              >
                Edit Note
              </button>
              <button
                disabled={btnLoading}
                className="bg-gray-500 transition hover:bg-gray-600 rounded-2xl text-white px-10 py-3 font-medium border-2 border-yellow-400"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to Home
              </button>
            </span>
            <span className="font-light text-xl absolute top-4 right-6">
              Author : {author ? author : "Author Unavailable"}
            </span>
            <span className="font-light text-xl absolute top-4 left-6">
              Created At : {date ? getRealDate(date) : "Date Unavailable"}
            </span>
          </div>
        </section>
      )}
    </>
  );
}

export default Onenote;
