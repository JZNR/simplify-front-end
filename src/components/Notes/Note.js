import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function Note(props) {
  return (
    <div className="note">
      <div className="note__body">{props.description}</div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <DeleteForeverOutlinedIcon
          className="note__delete"
          onClick={() => props.deleteNote(props.id)}
          aria-hidden="true"
        ></DeleteForeverOutlinedIcon>
      </div>
    </div>
  );
}

export default Note;
