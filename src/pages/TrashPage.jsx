import { useEffect } from "react";
import { toast } from "react-toastify";
import { TrashedNoteCard } from "../components/TrashedNoteCard";
import { useApi } from "../contexts/ApiContext";
import { useData } from "../contexts/DataContext";
import { EmptyState } from "../components/EmptyState";
import emptyImage from "../assets/emptyImage.svg";

export const TrashPage = () => {
  const { state: globalState } = useData();
  const { useGetAllNotes, useDeleteSingleNote, useUpdateSingleNote } = useApi();
  const { loading: loadingNotes, data: noteData } = useGetAllNotes();
  const [deleteNote, { loading: isDeletingNote, data: deletedNoteData }] =
    useDeleteSingleNote();
  const [updateNote, { loading: isUpdatingNote, data: updateNoteData }] =
    useUpdateSingleNote();

  useEffect(() => {
    if (deletedNoteData) {
      toast("deleted");
    }
  }, [deletedNoteData]);

  const trashedNote = globalState.notes.filter((i) => i.isTrashed);

  return (
    <div className="note-listing-container">
      {trashedNote.map((item) => {
        return (
          <TrashedNoteCard
            key={item._id}
            title={item.title}
            body={item.body}
            noteTag={item.tag}
            noteColor={item.color}
            onDelete={() => deleteNote({}, item._id)}
            onRestore={() => updateNote({ isTrashed: false }, item._id)}
          />
        );
      })}
      {trashedNote.length === 0 && (
        <EmptyState
          title="Nothing in trash"
          description="Add some to see here"
          buttonText="Go Back"
          onButtonClick={() => console.log("clicked")}
          imageUrl={emptyImage}
        />
      )}
    </div>
  );
};
