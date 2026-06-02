import { useState } from "react";
import { baseURL } from "../utils/baseURL";
import { errorEmitter, successEmitter } from "../utils/emitter";
import ButtonLoading from "../Components/ButtonLoading";
import { useNavigate } from "react-router-dom";
type UserForm = {
  email: string;
  name: string;
};
function Signup() {
  const [form, setForm] = useState<UserForm>({
    name: "",
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
      if (!form.email || !form.name) {
        errorEmitter("Name and Email both are required");
        return;
      }
      let response = await fetch(`${baseURL}/user/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      let signUpData = await response.json();

      if (signUpData.success) {
        successEmitter(signUpData.message);
        navigate("/login");
      } else errorEmitter(signUpData.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="h-screen relative w-screen bg-violet-600 flex justify-center items-center">
        <div className="">
          <form
            className="flex border-pink-400 border-2 flex-col py-16 bg-gray-100 px-20 justify-center items-center gap-6 rounded-4xl"
            onSubmit={async (e) => {
              e.preventDefault();
              await submitForm();
            }}
          >
            <h2 className="font-medium text-3xl">Create new account</h2>
            <p className=" text-gray-500 text-center font-medium">
              Join the platform to <br /> create and manage your notes
            </p>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChangeFunc}
              className="border-black border-2 px-4 py-3 rounded-xl opacity-65"
              required
              placeholder="Enter your name..."
            />
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
                    Submitting... <ButtonLoading />
                  </div>
                ) : (
                  "Submit"
                )}
              </>
            </button>
            <button className="">
              Already have an account?{" "}
              <u
                onClick={() => {
                  navigate("/login");
                }}
                className="text-blue-800"
              >
                Sign In
              </u>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;
