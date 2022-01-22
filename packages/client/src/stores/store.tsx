import { Dispatch, useReducer } from "react";
import { createContext, useContext } from "react";

type User = {
  name: string;
  avatarUrl: string;
};

type TStore = {
  user: User | null;
};

const initialStore: TStore = {
  user: null,
};

type TAction = { type: "signin"; payload: { name: string; avatarUrl: string } };

const reducer: React.Reducer<TStore, TAction> = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, user: { ...action.payload } };
    default:
      return state;
  }
};

type TStoreContext = {
  state: TStore;
  dispatch: Dispatch<TAction>;
};

const StoreContext = createContext<TStoreContext>({} as TStoreContext);

// Hooks
export const useStore = () => useContext(StoreContext);

// Provider
const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStore);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
