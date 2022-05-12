import { NoteCard } from "../components/NoteCard";

export const NoteListing = () => {
  return (
    <div className="note-listing-container">
      {[1, 2, 3, 4, 5].map((item) => (
        <NoteCard />
      ))}
    </div>
  );
};
