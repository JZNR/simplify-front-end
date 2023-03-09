import { useState, useEffect, useContext } from "react";
import "../../Notes.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { deleteNote, getNotes, editNote } from "../../api";
import { UserContext } from "../../context/user.context";
import Spinner from "react-bootstrap/Spinner";

function Notes() {
  const { loggedUser } = useContext(UserContext);
  const [notes, setNotes] = useState("");
  const [pinned, setPinned] = useState(false);

  async function getAllNotes() {
    const response = await getNotes();
    console.log("response notes", response);
    setNotes(response.data);
  }

  useEffect(() => {
    getAllNotes();
  }, [loggedUser]);

  // add new note to the state array
  //   const saveHandler = () => {
  //     setNotes((prevState) => [
  //       ...prevState,
  //       {
  //         id: uuid(),
  //         text: inputText
  //       }
  //     ]);
  //     //clear the textarea
  //     setInputText("");
  //   };
  function handleDeleteNote(noteID) {
    console.log("delete note id", noteID);
    deleteNote(noteID);
    getAllNotes();
  }

  async function handlePinNote(noteID) {
    try {
      setPinned(!pinned);
      await editNote({
        noteID: noteID,
        pinned,
      });
      getAllNotes();
    } catch (error) {
      console.error("Error occured", error);
    }
  }

  async function handleUnPinNote(noteID) {
    try {
      await editNote({
        noteID: noteID,
        pinned,
      });
      getAllNotes();
    } catch (error) {
      console.error("Error occured", error);
    }
  }

  return !notes ? (
    <div className="spinner">
      <Spinner animation="border" variant="light" />
    </div>
  ) : (
    <div className="notes-page">
      <div className="notes">
        {notes &&
          notes.map((note) => (
            <>
              {note.pinned === true && (
                <>
                  <Note
                    pinned={pinned}
                    color="#3f3fc0"
                    key={note._id}
                    id={note._id}
                    description={note.description}
                    deleteNote={handleDeleteNote}
                    handlePinNote={handleUnPinNote}
                  />
                </>
              )}
            </>
          ))}

        {notes &&
          notes.map((note) => (
            <>
              {!note.pinned && (
                <Note
                  style={{ color: "red" }}
                  key={note._id}
                  id={note._id}
                  description={note.description}
                  deleteNote={handleDeleteNote}
                  handlePinNote={handlePinNote}
                />
              )}
            </>
          ))}
        <CreateNote notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}

export default Notes;
