import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QuillEditor } from "./QuillEditor";
import { noteColors } from "../constants/note-colors";
import { notePriorityData } from "../constants/notePriority";
import { useApi } from "../contexts/ApiContext";
import { useData } from "../contexts/DataContext";
import { Modal } from "./Modal";

export const EditNoteModal = ({ selectedItem, onClose }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const navigate = useNavigate();
  const [noteBody, setNoteBody] = useState(selectedItem.body || "");
  const [activeColor, setActiveColor] = useState(
    noteColors.indexOf(selectedItem.color || 0)
  );
  const [noteTitle, setNoteTitle] = useState(selectedItem.title || "");
  const [noteTag, setNoteTag] = useState(selectedItem.tag || "");
  console.log(selectedItem.tag || "hey");

  const [notePriority, setNotePriority] = useState(
    notePriorityData.slice(1)[
      notePriorityData.slice(1).indexOf(selectedItem.priority)
    ]
  );
  const { useUpdateSingleNote } = useApi();
  const { dispatch: globalDispatch } = useData();
  const [updateNote, { loading: isUpdatingNote, data: updateNoteData }] =
    useUpdateSingleNote();
  const createNoteHandler = () => {
    const data = {
      title: noteTitle,
      body: noteBody,
      color: noteColors[activeColor],
      tag: noteTag.toLocaleLowerCase(),
      priority: notePriority,
    };

    updateNote(data, selectedItem._id);
  };

  useEffect(() => {
    if (updateNoteData) {
      navigate("/notes");
      onClose();
      toast("updated");
    }
  }, [updateNoteData]);
  console.log(notePriority);
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
                  <option
                    key={item}
                    value={item}
                    selected={selectedItem.priority}
                  >
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
            disabled={isUpdatingNote}
            onClick={() => createNoteHandler()}
          >
            Update
          </button>
          <button className="btn text-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
