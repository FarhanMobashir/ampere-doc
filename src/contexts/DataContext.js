import { useThunkReducer } from "../hooks/useThunkReducer";
import produce from "immer";
import React from "react";
import { apiActionTypes } from "./ApiContext";

const initialState = {
  notes: [],
  singleNote: [],
  showModal: false,
};

export const UIActions = {
  showModal: "showModal",
};

const reducer = produce((state = initialState, action) => {
  // * playlist actions

  if (action.type === apiActionTypes.getAllNotes) {
    state.notes = action.payload.data;
  }
  if (action.type === apiActionTypes.updateSingleNote) {
    state.notes = action.payload.data;
  }
  if (action.type === apiActionTypes.createSingleNote) {
    state.notes = action.payload.data;
  }
  if (action.type === apiActionTypes.deleteSingleNote) {
    state.notes = action.payload.data;
  }
  if (action.type === apiActionTypes.getSingleNote) {
    state.singleNote = action.payload.data;
  }

  if (action.type === UIActions.showModal) {
    state.showModal = action.payload;
  }

  // * clear state
  if (action.type === "clearState") {
    return initialState;
  }
}, initialState);

export const DataContext = React.createContext();
DataContext.displayName = "DataContext";

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
