import { Input } from "../components/Input";

export const CreateNote = () => {
  return (
    <div className="create-note-container">
      <Input
        label="Title"
        value=""
        placeholder="Enter title here..."
        type="text"
        required={true}
        htmlFor="title"
      />
      <Input
        label="Tag Name"
        value=""
        placeholder="Enter tag name here..."
        type="text"
        required={true}
        htmlFor="title"
      />
      <label className="tx-20 black-5">
        Color
        <input type="color" />
      </label>
      <textarea className="note-description-area" />
      <button className="btn btn-lg btn-primary">Create +</button>
    </div>
  );
};
