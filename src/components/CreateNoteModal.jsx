import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import { QuillEditor } from "../components/QuillEditor";
import { noteColors } from "../constants/note-colors";
import { useApi } from "../contexts/ApiContext";
import { UIActions, useData } from "../contexts/DataContext";
import { Modal } from "./Modal";

export const CreateNoteModal = () => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const navigate = useNavigate();
  const [noteBody, setNoteBody] = useState("");
  const [activeColor, setActiveColor] = useState(0);
  const [noteTitle, setNoteTitle] = useState("");
  const { useCreateSingleNote } = useApi();
  const { dispatch: globalDispatch } = useData();
  const [createNote, { loading: isCreatingNote, data: createdNoteData }] =
    useCreateSingleNote();
  const createNoteHandler = () => {
    const data = {
      title: noteTitle,
      body: noteBody,
      color: noteColors[activeColor],
      tag: "daily",
    };
    createNote(data);
  };

  useEffect(() => {
    if (createdNoteData) {
      navigate("/notes");
      globalDispatch({ type: UIActions.showModal, payload: false });
      toast("created");
    }
  }, [createdNoteData]);
  return (
    <Modal>
      <div className="create-note-container">
        <div className="note-input-container">
          <input
            className="note-title-input"
            type="text"
            placeholder="Enter title here"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <input
            className="note-title-input"
            type="text"
            placeholder="Enter title here"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />

          <QuillEditor
            value={noteBody}
            onChange={(e) => {
              console.log(e);
              setNoteBody(e);
            }}
            placeholder={"Enter here.."}
            modules={modules}
          />
          <div className="note-color-container">
            {noteColors.map((item, idx) => (
              <div
                className="note-color"
                onClick={() => setActiveColor(idx)}
                style={{
                  backgroundColor: item,
                  border: activeColor === idx ? "2px solid black" : "",
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex-between-container">
          <button
            className="btn btn-primary"
            disabled={isCreatingNote}
            onClick={() => createNoteHandler()}
          >
            Create +
          </button>
          <button
            className="btn text-btn"
            onClick={() =>
              globalDispatch({ type: UIActions.showModal, payload: false })
            }
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
