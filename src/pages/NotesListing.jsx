import { toast } from "react-toastify";
import { EmptyState } from "../components/EmptyState";
import { NoteCard } from "../components/NoteCard";
import { useApi } from "../contexts/ApiContext";
import { UIActions, useData } from "../contexts/DataContext";
import emptyImage from "../assets/emptyImage.svg";
import { useEffect, useState } from "react";
import { CreateNoteModal } from "../components/CreateNoteModal";
import { CardSkeleton } from "../components/Skeleton";
import { sortByDateData } from "../constants/note-sort-by-date";
import { notePriorityData } from "../constants/notePriority";
import { EditNoteModal } from "../components/EditNoteModal";

export const NoteListing = () => {
  const { state: globalState, dispatch: globalDispatch } = useData();
  const { useGetAllNotes, useUpdateSingleNote } = useApi();
  const { loading: loadingNotes, data: noteData } = useGetAllNotes();

  const [updateNote, { loading: isUpdatingNote, data: updateNoteData }] =
    useUpdateSingleNote();

  useEffect(() => {
    if (updateNoteData) {
      toast("Updated");
    }
  }, [updateNoteData]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allNotes = globalState.notes
    .filter((i) => !i.isTrashed && !i.isArchived && !i.isPinned)
    .reverse();

  const pinnedNotes = globalState.notes.filter(
    (i) => i.isPinned && !i.isTrashed && !i.isArchived
  );

  const allTags = [...new Set(allNotes.map((i) => i.tag))]
    .concat("all")
    .reverse();

  // filtering states
  const [sortByDate, setSortByDate] = useState(sortByDateData[0]);
  const [sortByTag, setSortByTag] = useState(allTags[0]);
  const [sortByPriority, setSortByPriority] = useState(notePriorityData[0]);
  const [selected, setSelected] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // filtering function
  let sortedData = [];
  const sortByDateFn = (arr, query) => {
    if (query === "oldest") {
      return arr.reverse();
    } else {
      return arr;
    }
  };

  const sortByTagFn = (arr, query) => {
    if (query === "all") {
      return arr;
    } else {
      return arr.filter((item) => query === item.tag);
    }
  };

  const sortByPriorityFn = (arr, query) => {
    if (query === "all") {
      return arr;
    } else {
      return arr.filter((item) => query === item.priority);
    }
  };

  if (noteData) {
    sortedData = sortByPriorityFn(
      sortByTagFn(sortByDateFn(allNotes, sortByDate), sortByTag),
      sortByPriority
    );
  }
  return (
    <div className="p-20">
      <div className="note-listing-button-container">
        <button
          className="btn btn-outline mr-auto"
          onClick={() => setShowFilter(!showFilter)}
        >
          {showFilter ? "Hide" : "Sort"} <i className="uil uil-sort"></i>
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            globalDispatch({ type: UIActions.showModal, payload: true })
          }
        >
          Create +
        </button>
      </div>
      {showFilter && (
        <div className="note-filter-container">
          <label className="filter-item">
            Sort by date
            <select
              id="sort-by-date"
              onChange={(e) =>
                setSortByDate(sortByDateData[e.target.selectedIndex])
              }
            >
              {sortByDateData.map((item) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-item">
            Sort by tags
            <select
              id="sort-by-tags"
              onChange={(e) => setSortByTag(allTags[e.target.selectedIndex])}
            >
              {allTags.map((item) => (
                <option key={item} value="work">
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-item">
            Sort by priority
            <select
              id="sort-by-priority"
              onChange={(e) =>
                setSortByPriority(notePriorityData[e.target.selectedIndex])
              }
            >
              {notePriorityData.map((item) => (
                <option key={item} value="high">
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className="note-listing-container">
        {loadingNotes &&
          new Array(10).fill(1).map((i) => <CardSkeleton key={i++} />)}
        {globalState.notes &&
          pinnedNotes.map((item) => {
            return (
              <NoteCard
                key={item._id}
                title={item.title}
                body={item.body}
                noteTag={item.tag}
                noteColor={item.color}
                notePriority={item.priority}
                noteDate={Date(item.createdAt.toLocaleString()).slice(0, 15)}
                onEdit={() => {
                  setSelected(item);
                  setShowEditModal(true);
                }}
                onPin={() => updateNote({ isPinned: !item.isPinned }, item._id)}
                onArchive={() => updateNote({ isArchived: true }, item._id)}
                onDelete={() => updateNote({ isTrashed: true }, item._id)}
                onClick={() => console.log("clicked")}
                isPinned={item.isPinned}
              />
            );
          })}
        {!loadingNotes &&
          sortedData.map((item) => (
            <div style={{ width: "100%", height: "100%" }} key={item._id}>
              <NoteCard
                key={item._id}
                title={item.title}
                body={item.body}
                noteTag={item.tag}
                noteColor={item.color}
                notePriority={item.priority}
                noteDate={Date(item.createdAt.toLocaleString()).slice(0, 15)}
                onEdit={() => {
                  setShowEditModal(true);
                  setSelected(item);
                }}
                onPin={() => updateNote({ isPinned: !item.isPinned }, item._id)}
                onArchive={() => updateNote({ isArchived: true }, item._id)}
                onDelete={() => updateNote({ isTrashed: true }, item._id)}
                onClick={() => console.log("clicked")}
                isPinned={item.isPinned}
              />
            </div>
          ))}
        <button
          className="btn btn-primary btn-lg"
          onClick={() =>
            globalDispatch({ type: UIActions.showModal, payload: true })
          }
        >
          Create +
        </button>
      </div>

      {/* // modal */}
      {globalState.showModal && <CreateNoteModal />}
      {showEditModal && (
        <EditNoteModal
          onClose={() => setShowEditModal(false)}
          selectedItem={selected}
        />
      )}
      {sortedData.length === 0 && (
        <EmptyState
          title="Nothing to show"
          description="Try creating some nites then you will see it here"
          buttonText="Create +"
          onButtonClick={() => console.log("clicked")}
          imageUrl={emptyImage}
        />
      )}
    </div>
  );
};
