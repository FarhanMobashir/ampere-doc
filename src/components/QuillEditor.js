import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const QuillEditor = ({ placeholder, value, onChange, modules }) => {
  return (
    <ReactQuill
      modules={modules}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
