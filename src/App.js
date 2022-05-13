import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ActiveUser } from "./components/ActiveUser";
import { AppLayout } from "./components/AppLayout";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { CreateNote } from "./pages/CreateNote";
import { HomePage } from "./pages/Homepage";
import { NoteListing } from "./pages/NotesListing";
import { SingleNote } from "./pages/SingleNote";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/user"
              element={<PrivateRoute element={<ActiveUser />} />}
            />
            <Route path="/notes">
              <Route
                path="/notes"
                element={<PrivateRoute element={<NoteListing />} />}
              />
              <Route
                path="/notes/create"
                element={<PrivateRoute element={<CreateNote />} />}
              />
              <Route
                path="/notes/:id"
                element={<PrivateRoute element={<SingleNote />} />}
              />
              <Route
                path="/notes/trash"
                element={<PrivateRoute element={<h1>Trash</h1>} />}
              />
              <Route
                path="/notes/archive"
                element={<PrivateRoute element={<h1>Archive</h1>} />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
