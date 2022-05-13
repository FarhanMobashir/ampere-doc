import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

export const Modal = ({ children }) => {
  const elementRef = React.useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }
  React.useEffect(() => {
    modalRoot.appendChild(elementRef.current);
    return () => modalRoot.removeChild(elementRef.current);
  }, []);
  // top level element needs to be single element
  return createPortal(
    <div className="modal">{children}</div>,
    elementRef.current
  );
};
