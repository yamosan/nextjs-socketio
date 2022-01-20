import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type TStoreContext = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

const StoreContext = createContext<TStoreContext | null>(null);

// Hooks
export const useStore = () => useContext(StoreContext);

// Provider
const StoreProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  return (
    <StoreContext.Provider value={{ username, setUsername }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
