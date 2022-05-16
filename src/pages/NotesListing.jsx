import { toast } from "react-toastify";
import { EmptyState } from "../components/EmptyState";
import { NoteCard } from "../components/NoteCard";
import { useApi } from "../contexts/ApiContext";
import { useData } from "../contexts/DataContext";
import emptyImage from "../assets/emptyImage.svg";
import { useEffect, useState } from "react";
import { CreateNoteModal } from "../components/CreateNoteModal";

export const NoteListing = () => {
  const { state: globalState } = useData();
  const { useGetAllNotes, useUpdateSingleNote } = useApi();
  const { loading: loadingNotes, data: noteData } = useGetAllNotes();

  const [updateNote, { loading: isUpdatingNote, data: updateNoteData }] =
    useUpdateSingleNote();
  // local state
  // if (!loadingNotes) {
  //   console.log("note from api", noteData);
  // }
  useEffect(() => {
    if (updateNoteData) {
      toast("Updated");
    }
  }, [updateNoteData]);

  const allNotes = globalState.notes.filter(
    (i) => !i.isTrashed && !i.isArchived
  );

  const pinnedNotes = globalState.notes.filter((i) => i.isPinned);
  return (
    <div>
      <h1>Pinned Notes</h1>
      <div className="note-listing-container">
        {globalState.notes &&
          pinnedNotes.map((item) => {
            return (
              <NoteCard
                key={item.title}
                title={item.title}
                body={item.body}
                noteTag={item.tag}
                noteColor={item.color}
                onEdit={() => toast("Wow so easy")}
                onPin={() => updateNote({ isPinned: !item.isPinned }, item._id)}
                onArchive={() => updateNote({ isArchived: true }, item._id)}
                onDelete={() => updateNote({ isTrashed: true }, item._id)}
                onClick={() => console.log("clicked")}
                isPinned={item.isPinned}
              />
            );
          })}
      </div>
      <div className="note-listing-container">
        {!loadingNotes &&
          allNotes.map((item) => (
            <NoteCard
              key={item.title}
              title={item.title}
              body={item.body}
              noteTag={item.tag}
              noteColor={item.color}
              onEdit={() => toast("Wow so easy")}
              onPin={() => updateNote({ isPinned: !item.isPinned }, item._id)}
              onArchive={() => updateNote({ isArchived: true }, item._id)}
              onDelete={() => updateNote({ isTrashed: true }, item._id)}
              onClick={() => console.log("clicked")}
              isPinned={item.isPinned}
            />
          ))}
        {/* // modal */}
        {globalState.showModal && <CreateNoteModal />}
        {globalState.notes.length === 0 && (
          <EmptyState
            title="You havent created any notes yet"
            description="Try creating some nites then you will see it here"
            buttonText="Create +"
            onButtonClick={() => console.log("clicked")}
            imageUrl={emptyImage}
          />
        )}
      </div>
    </div>
  );
};
