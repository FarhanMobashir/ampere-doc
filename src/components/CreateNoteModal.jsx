import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QuillEditor } from "../components/QuillEditor";
import { noteColors } from "../constants/note-colors";
import { notePriorityData } from "../constants/notePriority";
import { useApi } from "../contexts/ApiContext";
import { UIActions, useData } from "../contexts/DataContext";
import { Modal } from "./Modal";

export const CreateNoteModal = () => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const navigate = useNavigate();
  const [noteBody, setNoteBody] = useState("note body");
  const [noteTitle, setNoteTitle] = useState("untitled");
  const [activeColor, setActiveColor] = useState(0);
  const [noteTag, setNoteTag] = useState("untitled");
  const [notePriority, setNotePriority] = useState(notePriorityData[1]);
  const { useCreateSingleNote } = useApi();
  const { dispatch: globalDispatch } = useData();
  const [createNote, { loading: isCreatingNote, data: createdNoteData }] =
    useCreateSingleNote();
  const createNoteHandler = () => {
    const data = {
      title: noteTitle.length === 0 ? "untitled" : noteTitle,
      body: noteBody.length === 0 ? "note body" : noteBody,
      color: noteColors[activeColor],
      tag: noteTag.toLowerCase() || "untitled",
      priority: notePriority,
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
            className="note-tag-input"
            type="text"
            placeholder="Enter tag here"
            value={noteTag}
            onChange={(e) => setNoteTag(e.target.value)}
          />

          <QuillEditor
            value={noteBody}
            onChange={(e) => {
              setNoteBody(e);
            }}
            placeholder={"Enter here.."}
            modules={modules}
          />
          <div className="flex-between-container">
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
            <div className="flex-between-container">
              <h5 className="h6 mh-20">Priority</h5>
              <select
                id="priority"
                onChange={(e) => {
                  setNotePriority(
                    notePriorityData.slice(1)[e.target.selectedIndex]
                  );
                }}
              >
                {notePriorityData.slice(1).map((item) => (
                  <option key={item} value={item}>
                    {item.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
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
