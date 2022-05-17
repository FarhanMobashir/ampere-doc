import { useEffect, useRef } from "react";

export const NoteCard = ({
  title,
  body,
  noteTag,
  noteColor,
  noteDate,
  notePriority,
  onEdit,
  onPin,
  onArchive,
  onDelete,
  onClick,
  isPinned,
}) => {
  let bodyRef = useRef();
  useEffect(() => {
    if (body) {
      // bodyRef.current.innerHTML =
      //   body.length > 30 ? body.slice(0, 30) + "..." : body;
      bodyRef.current.innerHTML = body;
    }
  });
  return (
    <div
      className="note-card-container container-lg"
      style={{ borderTop: `10px solid ${noteColor}` }}
    >
      <div className="content-container">
        <div className="card-title-tag-container">
          <h2 className="card-title tx-20 black-6" onClick={onClick}>
            {/* {title.length > 15 ? title.slice(0, 15) + "..." : title} */}
            {title}
          </h2>
        </div>

        <div
          ref={bodyRef}
          className="note-card-description black-6"
          onClick={onClick}
        ></div>
        <div className="flex-between-container">
          <div className="pill pill-sm bg-orange-1 orange-5">{noteTag}</div>
          <div className="pill pill-sm bg-black-1 black-5">{notePriority}</div>
          <div className="pill pill-sm bg-blue-1 blue-5">{noteDate}</div>
        </div>
        <div className="bottom-container">
          <button className="btn btn-text " onClick={onEdit}>
            Edit
          </button>
          <div className="note-card-icon-container">
            <i
              className={`uil uil-map-pin note-card-icon ${
                isPinned ? "note-card-icon-pin-active" : ""
              }`}
              onClick={onPin}
            ></i>
            <i
              className="uil uil-archive note-card-icon "
              onClick={onArchive}
            ></i>
            <i
              className="uil uil-trash-alt note-card-icon"
              onClick={onDelete}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};
