import { useState } from "react";
import { baseURL } from "../utils/baseURL";
import { errorEmitter, successEmitter } from "../utils/emitter";
import ButtonLoading from "../Components/ButtonLoading";
import { useNavigate } from "react-router-dom";
import { useAllContext } from "../Contexts/AllContexts";
import { ArrowLeftSquare } from "lucide-react";
type UserForm = {
  email: string;
};
function Login() {
  const { setUser } = useAllContext();
  const [form, setForm] = useState<UserForm>({
    email: "",
  });
  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  let submitForm = async () => {
    try {
      setLoading(true);
      if (!form.email) {
        errorEmitter("Email is required");
        return;
      }
      let response = await fetch(`${baseURL}/user/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      let loginData = await response.json();

      if (loginData.success) {
        successEmitter(loginData.message);
        setUser(loginData.user);
        navigate("/");
        localStorage.setItem("notesUser", JSON.stringify(loginData.user));
      } else errorEmitter(loginData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="h-screen relative w-screen bg-violet-600 flex justify-center items-center">
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="absolute text-gray-100 font-medium top-4 left-4"
        >
          <div className="flex gap-2 items-center">
            {" "}
            <ArrowLeftSquare /> Back to Sign up
          </div>
        </button>
        <div className="">
          <form
            className="flex border-pink-400 border-2 flex-col py-16 bg-gray-100 px-20 justify-center items-center gap-6 rounded-4xl"
            onSubmit={async (e) => {
              e.preventDefault();
              await submitForm();
            }}
          >
            <h2 className="font-medium text-3xl">Log into existing account</h2>
            <p className=" text-gray-500 text-center font-medium">
              Log in to view <br /> and manage your notes
            </p>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChangeFunc}
              className="border-black border-2 px-4 py-3 rounded-xl opacity-65"
              required
              placeholder="Enter your email..."
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 px-16 transition hover:text-white font-medium py-3 rounded-2xl"
            >
              <>
                {" "}
                {loading ? (
                  <div className="flex gap-2">
                    Loggin in... <ButtonLoading />
                  </div>
                ) : (
                  "Log in"
                )}
              </>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
