import { createContext, useContext, useState, type ReactNode } from "react";
type Context = {
  allNotes: Notes[];
  setAllNotes: React.Dispatch<React.SetStateAction<Notes[]>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
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
let allContext = createContext<Context | null>(null);
function AllContexts({ children }: { children: ReactNode }) {
  const [allNotes, setAllNotes] = useState<Notes[]>([]);
  const storedUser = localStorage.getItem("notesUser");
  const [user, setUser] = useState<User>(
    storedUser
      ? JSON.parse(storedUser)
      : {
          _id: "",
          name: "",
          email: "",
          createdAt: "",
          updatedAt: "",
        },
  );
  return (
    <allContext.Provider value={{ allNotes, setAllNotes, user, setUser }}>
      {children}
    </allContext.Provider>
  );
}
export const useAllContext = () => {
  let context = useContext(allContext);
  if (!context) {
    throw new Error("Wrap the Node inside the context");
  }
  return context;
};
export default AllContexts;
