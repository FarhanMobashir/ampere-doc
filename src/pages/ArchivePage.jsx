import { useEffect } from "react";
import { toast } from "react-toastify";
import { ArchivedNoteCard } from "../components/ArchivedNoteCard";
import { useApi } from "../contexts/ApiContext";
import { useData } from "../contexts/DataContext";
import emptyImage from "../assets/emptyImage.svg";
import { EmptyState } from "../components/EmptyState";

export const ArchivePage = () => {
  const { state: globalState } = useData();
  const { useGetAllNotes, useDeleteSingleNote, useUpdateSingleNote } = useApi();
  const { loading: loadingNotes, data: noteData } = useGetAllNotes();

  const [updateNote, { loading: isUpdatingNote, data: updateNoteData }] =
    useUpdateSingleNote();

  useEffect(() => {
    if (updateNoteData) {
      toast("Updated");
    }
  }, [updateNoteData]);

  const archivedNote = globalState.notes.filter((i) => i.isArchived);

  return (
    <div className="note-listing-container">
      {archivedNote.map((item) => {
        return (
          <ArchivedNoteCard
            key={item._id}
            title={item.title}
            body={item.body}
            noteTag={item.tag}
            noteColor={item.color}
            onRestore={() => updateNote({ isArchived: false }, item._id)}
          />
        );
      })}
      {archivedNote.length === 0 && (
        <EmptyState
          title="You haven't archived any note"
          description="Archive some to see here"
          buttonText="Go Back"
          onButtonClick={() => console.log("clicked")}
          imageUrl={emptyImage}
        />
      )}
    </div>
  );
};
