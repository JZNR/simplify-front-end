import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PushPinIcon from '@mui/icons-material/PushPin';

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
        <PushPinIcon
          className="note__delete"
          onClick={() => props.handlePinNote(props.id)}
          aria-hidden="true"
        ></PushPinIcon>
      </div>
    </div>
  );
}

export default Note;
