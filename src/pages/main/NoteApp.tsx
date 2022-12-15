import React, { useState } from "react";
import "./NoteApp.scss";

type Note = {
  title: string;
  text: string;
  editing: boolean;
};

export default function NoteApp() {
  // initialize the notes state variable with the data from local storage, if it exists
  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );
  const [darkMode, setDarkMode] = useState(false);

  // handle the submission of a new note
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const noteTitleInput = event.currentTarget.elements.namedItem(
      "noteTitle"
    ) as HTMLInputElement;
    const noteTextInput = event.currentTarget.elements.namedItem(
      "noteText"
    ) as HTMLInputElement;
    const newNote = {
      title: noteTitleInput.value,
      text: noteTextInput.value,
      editing: false,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    noteTitleInput.value = "";
    noteTextInput.value = "";

    // save the updated notes state to local storage
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  function handleDelete(index: number) {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  function handleEditToggle(index: number) {
    const newNotes = [...notes];
    newNotes[index].editing = !newNotes[index].editing;
    setNotes(newNotes);
  }

  function handleEdit(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const newNotes = [...notes];
    newNotes[index].title = event.currentTarget.value;
    setNotes(newNotes);
  }

  // toggle the dark mode on and off
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  // determine the class name for the container element
  const containerClass = darkMode ? "dark-mode" : "light-mode";

  return (
    <div className={containerClass}>
      <main className="note__wrapper">
        <button onClick={() => toggleDarkMode()}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="">Title:</label>
          <input id="title-text" name="noteTitle" />
          <label htmlFor="">Text:</label>
          <input id="input-text" name="noteText" />
          <button>Add Note</button>
        </form>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <h3>{note.title}</h3>
              {note.editing ? (
                <input
                  value={note.text}
                  onChange={(event) => handleEdit(event, index)}
                />
              ) : (
                note.text
              )}
              <button onClick={() => handleEditToggle(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
