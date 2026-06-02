import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
