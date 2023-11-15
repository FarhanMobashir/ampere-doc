import React from "react";
import { buildHooks, fetchBaseQuery } from "../helpers/buildApiHooks";
import { AuthContext } from "./AuthContext";
import { useData } from "./DataContext";

export const ApiContext = React.createContext();
ApiContext.displayName = "ApiContext";

export const apiActionTypes = {
  getAllNotes: "getAllNotes",
  getSingleNote: "getSingleNote",
  updateSingleNote: "updateSingleNote",
  deleteSingleNote: "deleteSingleNote",
  createSingleNote: "createSingleNote",
};

export const ApiProvider = ({ children }) => {
  const { dispatch: dataProviderDispatch } = useData();
  const { authToken } = React.useContext(AuthContext);

  const headers = {
    authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };

  const privateApi = buildHooks(
    [
      // * for notes
      {
        name: apiActionTypes.getAllNotes,
        query: "/note",
        type: "query",
        method: "GET",
      },
      {
        name: apiActionTypes.getSingleNote,
        query: "/note",
        type: "query",
        method: "GET",
      },
      {
        name: apiActionTypes.createSingleNote,
        query: "/note",
        type: "mutation",
        method: "POST",
      },
      {
        name: apiActionTypes.updateSingleNote,
        query: "/note",
        type: "mutation",
        method: "PUT",
      },
      {
        name: apiActionTypes.deleteSingleNote,
        query: "/note",
        type: "mutation",
        method: "DELETE",
      },
    ],
    fetchBaseQuery({
      baseUrl: "https://ampere-doc-backend.onrender.com/api",
      headers: headers,
    }),
    dataProviderDispatch
  );

  const value = React.useMemo(() => {
    return {
      ...privateApi,
    };
  }, [privateApi]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = React.useContext(ApiContext);
  if (context === undefined) {
    throw new Error(`useApi must be used within a ApiProvider`);
  }
  return context;
};
