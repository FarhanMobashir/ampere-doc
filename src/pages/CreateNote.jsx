import { useState } from "react";
import { Input } from "../components/Input";
import { QuillEditor } from "../components/QuillEditor";
import { noteColors } from "../constants/note-colors";
import { useApi } from "../contexts/ApiContext";

export const CreateNote = () => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["clean"],
    ],
  };
  const [noteBody, setNoteBody] = useState("");
  const [activeColor, setActiveColor] = useState(0);
  const [noteTitle, setNoteTitle] = useState("");
  const { useCreateSingleNote } = useApi();
  const [createNote, { loading: isCreatingNote }] = useCreateSingleNote();
  const createNoteHandler = () => {
    const data = {
      title: noteTitle,
      body: noteBody,
      color: noteColors[activeColor],
      tag: "daily",
    };
    createNote(data);
  };
  return (
    <div className="create-note-container">
      <div className="note-input-container">
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
      <button
        className="btn btn-primary"
        disabled={isCreatingNote}
        onClick={() => createNoteHandler()}
      >
        Create +
      </button>
    </div>
  );
};
