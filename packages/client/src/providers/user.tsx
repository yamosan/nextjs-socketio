import { Dispatch, Reducer, useCallback } from "react";
import { createContext, useContext, useReducer } from "react";
import type { User } from "@project/common/types/types";

type TState = User | null;

const initialState: TState = null;

type TAction = { type: "signin"; payload: { name: string; avatarUrl: string } };

const reducer: Reducer<TState, TAction> = (state, action) => {
  switch (action.type) {
    case "signin":
      return {
        name: action.payload.name,
        avatarUrl: action.payload.avatarUrl,
      };
    default:
      return state;
  }
};

type UserContext = {
  user: TState;
  signin: (name: string, avatarUrl: string) => void;
};

const UserContext = createContext<UserContext>({} as UserContext);

// Hooks
export const useUser = () => useContext(UserContext);

// Provider
const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signin = useCallback(
    (name: string, avatarUrl: string) => {
      dispatch({ type: "signin", payload: { name, avatarUrl } });
    },
    [dispatch]
  );

  return <UserContext.Provider value={{ user: state, signin }}>{children}</UserContext.Provider>;
};

export default StoreProvider;
