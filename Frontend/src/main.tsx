import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Onenote from "./Pages/Onenote.tsx";
import Signup from "./Pages/Signup.tsx";
import AllContexts from "./Contexts/AllContexts.tsx";
import CreateNote from "./Pages/CreateNote.tsx";
import Login from "./Pages/Login.tsx";
let myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<CreateNote />} />
      <Route path="/onenote/:noteId" element={<Onenote />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AllContexts>
      <RouterProvider router={myRouter} />
    </AllContexts>
  </StrictMode>,
);
