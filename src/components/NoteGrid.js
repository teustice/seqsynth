import { useState, useEffect } from "react";
import NoteRow from "./NoteRow";

//Grid of all notes
function NoteGrid() {
  //16 beat grid
  const [noteRows, setNoteRows] = useState([
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false }
  ]);
  const [playLoop, setPlayLoop] = useState(null);
  const [clearing, setClearing] = useState(false);

  const play = () => {
    const bpm = 120;
    const beatsPerMilli = 60000 / bpm;
    let activeIndex = 0;
    const loop = setInterval(() => {
      if (activeIndex === noteRows.length) {
        activeIndex = 0;
      }
      const cloneNoteRows = [...noteRows];
      cloneNoteRows.forEach((row, i) => {
        row.active = (i === activeIndex);
      })
      setNoteRows(cloneNoteRows);
      activeIndex++
    }, 300);

    setPlayLoop(loop);
  }

  const stop = () => {
    clearInterval(playLoop);
    const cloneNoteRows = [...noteRows];
    cloneNoteRows.forEach((row, i) => {
      row.active = false;
    })
    setNoteRows(cloneNoteRows);
  }

  const clear = () => {
    [...document.querySelectorAll('.note--active')].forEach((note) => {
      note.click();
    })
  }

  return (
    <>
      <div className="notegrid">
        {noteRows.map((row, i) => {
          return (
            <NoteRow {...row} key={`noterow-${i}`} />
          )
        })}
      </div>
      <div className="controls">
        <button onClick={play}>Play</button>
        <button onClick={stop}>Stop</button>
        <button onClick={clear}>Clear</button>
      </div>
    </>
  )
}

export default NoteGrid;