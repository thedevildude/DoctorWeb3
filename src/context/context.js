import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
const Context = createContext(initialState);
const DispatchContext = createContext(() => {});
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

export const useContextState = () => useContext(Context);
export const useContextDispatch = () => useContext(DispatchContext);
