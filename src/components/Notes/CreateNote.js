import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useContext } from "react";
import { createNote, getNotes } from "../../api";
import "../../Notes.css";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";


function CreateNote(props) { 

    const [ characters, setCharacters ] = useState(0)

    const charLimit = 100;
    const charLeft = charLimit - characters.length;
    
    function handleCharactersChange(event) {
        setCharacters(event.target.value)
      }

    async function handleSubmitForm(event) {
    event.preventDefault();
    try {
        await createNote({
        title: characters,
        description: characters,
        });
        toast.success("Note created ");

        const response = await getNotes();
        props.setNotes(response.data);
    } catch (error) {
        toast.error("Error occured", error);
    }
    }
    

  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <Form onSubmit={handleSubmitForm}>
          <textarea
            cols="10"
            rows="5"
            value={characters}
            placeholder="Type...."
            onChange={handleCharactersChange}
            maxLength="100"
          ></textarea>
          <div className="note__footer">
            {/* <span className="label">{charLeft} left</span> */}
            {/* <button className="note__save" onClick={saveHandler}>
              Save
            </button> */}
          </div>
          <LinearProgress
            className="char__progress"
            variant="determinate"
            value={charLeft}
          />
          <Button variant="primary" type="submit">
            Create
          </Button>
      </Form>
    </div>
  );
}

export default CreateNote;
