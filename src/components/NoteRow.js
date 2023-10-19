import Note from "./Note";

function NoteRow({active}) {
  const notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

  return (
    <div className={`noterow ${active ? 'noterow--active' : ''}`}>
      {notes.map((n, i) => {
        return <Note note={n} key={`note-${i}`}/>
      })}
    </div>
  )
}

export default NoteRow;