import { createContext, Dispatch, FC, PropsWithChildren, useContext, useReducer } from "react";
import { Action, reducer } from "./reducer";
import { Diagnosis, Patient } from "../types";

export type State = {
  diagnoses: { [code: string]: Diagnosis },
  patients: { [id: string]: Patient };
};

const initialState: State = {
  diagnoses: {},
  patients: {}
};

const DispatchContext = createContext<Dispatch<Action>>(() => initialState);
const StateContext = createContext<State>(initialState);

export const StateProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => useContext(DispatchContext);
export const useStateValue = () => useContext(StateContext);
