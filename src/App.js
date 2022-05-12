import {BrowserRouter as Router ,Route,Routes} from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { AuthPage } from "./pages/AuthPage";
import { CreateNote } from "./pages/CreateNote";
import { HomePage } from "./pages/Homepage";
import { NoteListing } from "./pages/NotesListing";
import { SingleNote } from "./pages/SingleNote";

function App() {
  return (
   <Router>
     <Routes>
       <Route path="/" element={<AppLayout/>}>
         <Route path="/auth" element={<AuthPage/>}/>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/notes">
         <Route path="/notes" element={<NoteListing/>}/>
         <Route path="/notes/create" element={<CreateNote/>}/>
         <Route path="/notes/:id" element={<SingleNote/>}/>
         </Route>
       </Route>
     </Routes>
   </Router>
  );
}

export default App;
