import React, { createContext, useReducer } from "react";

//  TODO: Add state
interface State {}

const initialState: State = {};

interface Action {
  type: "SET_VALUE";
  payload: string;
}

const SolwireContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { ...initialState },
  dispatch: () => null,
});

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, redirectUri: action.payload };
    default:
      return state;
  }
}

interface SolwireProviderProps {
  children: React.ReactNode;
}

function SolwireProvider({ children }: SolwireProviderProps) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
  });

  return (
    <SolwireContext.Provider value={{ state, dispatch }}>
      {children}
    </SolwireContext.Provider>
  );
}

export { SolwireContext, SolwireProvider };
