import Note from "./Note";

function NoteRow({ active, index, audioCTX, waveshape }) {
  const notes = [130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.0, 196.0, 207.65, 220.0, 233.08, 246.94, 261.63].reverse();

  return (
    <div className={`noterow ${active ? 'noterow--active' : ''}`}>
      {notes.map((n, i) => {
        return <Note
          playing={active}
          note={n}
          audioCTX={audioCTX}
          waveshape={waveshape}
          key={`note-${index}-${i}`}
        />
      })}
    </div>
  )
}

export default NoteRow;