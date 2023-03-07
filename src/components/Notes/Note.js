function Note(props) {
  return (
    <div className="note">
      <div className="note__body">{props.description}</div>
      <div className="note__footer" style={{ justifyContent: "flex-end" }}>
        <button
          className="note__delete"
          onClick={() => props.deleteNote(props.id)}
          aria-hidden="true"
        ></button>
      </div>
    </div>
  );
}

export default Note;
