import { useEffect, useRef } from "react";

export const ArchivedNoteCard = ({
  title,
  body,
  noteTag,
  noteColor,
  onClick,
  onRestore,
}) => {
  let bodyRef = useRef();
  useEffect(() => {
    if (body) {
      bodyRef.current.innerHTML =
        body.length > 30 ? body.slice(0, 30) + "..." : body;
    }
  });
  return (
    <div
      className="note-card-container container-lg"
      style={{ borderRight: `10px solid ${noteColor}` }}
    >
      <div className="content-container">
        <div className="card-title-tag-container">
          <h2 className="card-title tx-20 black-6" onClick={onClick}>
            {title.length > 15 ? title.slice(0, 15) + "..." : title}
          </h2>
          <div className="pill pill-sm bg-black-1 black-5 ">{noteTag}</div>
        </div>

        <div
          ref={bodyRef}
          className="card-description black-6"
          onClick={onClick}
        ></div>
        <div className="bottom-container ml-auto">
          <div className="note-card-icon-container">
            <i className="uil uil-redo note-card-icon " onClick={onRestore}></i>
          </div>
        </div>
      </div>
    </div>
  );
};
