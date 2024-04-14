import React from "react";
interface State {
}
interface Action {
    type: "SET_VALUE";
    payload: string;
}
declare const SolwireContext: React.Context<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>;
interface SolwireProviderProps {
    children: React.ReactNode;
}
declare function SolwireProvider({ children }: SolwireProviderProps): import("react/jsx-runtime").JSX.Element;
export { SolwireContext, SolwireProvider };
