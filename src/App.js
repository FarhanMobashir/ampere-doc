import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ActiveUser } from "./components/ActiveUser";
import { AppLayout } from "./components/AppLayout";
import { PrivateRoute } from "./components/PrivateRoute";
import { ApiProvider } from "./contexts/ApiContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider, useData } from "./contexts/DataContext";
import { AuthPage } from "./pages/AuthPage";
import { CreateNote } from "./pages/CreateNote";
import { HomePage } from "./pages/Homepage";
import { NoteListing } from "./pages/NotesListing";
import { SingleNote } from "./pages/SingleNote";
import "react-toastify/dist/ReactToastify.css";
import { CreateNoteModal } from "./components/CreateNoteModal";
import { TrashPage } from "./pages/TrashPage";
import { ArchivePage } from "./pages/ArchivePage";

function App() {
  const { state: globalState } = useData();
  return (
    <Router>
      <ToastContainer
        hideProgressBar={true}
        position="bottom-right"
        autoClose={450}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        style={{ fontSize: "1.6rem" }}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {globalState.showModal && <CreateNoteModal />}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
          {/* private route */}
          <Route
            path="/user"
            element={<PrivateRoute element={<ActiveUser />} />}
          />
          <Route path="/notes">
            <Route
              path="/notes"
              element={<PrivateRoute element={<NoteListing />} />}
            />
            {/* <Route
              path="/notes/create"
              element={<PrivateRoute element={<CreateNote />} />}
            /> */}
            <Route
              path="/notes/:id"
              element={<PrivateRoute element={<SingleNote />} />}
            />
            <Route
              path="/notes/trash"
              element={<PrivateRoute element={<TrashPage />} />}
            />
            <Route
              path="/notes/archive"
              element={<PrivateRoute element={<ArchivePage />} />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
