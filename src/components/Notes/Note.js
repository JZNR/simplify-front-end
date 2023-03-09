import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
function Note(props) {
  const [color] = useState(props.color);

  return (
    <div className="note" style={{ color: color }}>
      <div className="note__body">{props.description}</div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <DeleteForeverOutlinedIcon
          className="note__delete"
          onClick={() => props.deleteNote(props.id)}
          aria-hidden="true"
        ></DeleteForeverOutlinedIcon>
        {!props.pinned && (
          <BookmarkIcon
            className="note__delete"
            onClick={() => props.handlePinNote(props.id)}
            aria-hidden="true"
          ></BookmarkIcon>
        )}
        {props.pinned && (
          <BookmarkRemoveIcon
            className="note__delete"
            onClick={() => props.handlePinNote(props.id)}
            aria-hidden="true"
          ></BookmarkRemoveIcon>
        )}
      </div>
    </div>
  );
}

export default Note;
