import { useState, useEffect, useContext } from "react";
import "../../Notes.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import { deleteNote, getNotes } from "../../api";
import { UserContext } from "../../context/user.context";
import Spinner from "react-bootstrap/Spinner";

function Notes() {
  const { loggedUser } = useContext(UserContext);
  const [notes, setNotes] = useState("");

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

  return !notes ? (
    <div className="spinner">
      <Spinner animation="border" variant="light" />
    </div>
  ) : (
    <div className="notes-page">
      <div className="notes">
        {notes &&
          notes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              description={note.description}
              deleteNote={handleDeleteNote}
            />
          ))}
        <CreateNote notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}

export default Notes;
