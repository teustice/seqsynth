import Note from "./Note";

function NoteRow({active, index, audioCTX}) {
  const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'].reverse();

  return (
    <div className={`noterow ${active ? 'noterow--active' : ''}`}>
      {notes.map((n, i) => {
        return <Note playing={active} note={n} audioCTX={audioCTX} key={`note-${index}-${i}`}/>
      })}
    </div>
  )
}

export default NoteRow;