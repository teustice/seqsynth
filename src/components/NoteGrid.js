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
  const [tempo, setTempo] = useState('120');
  const [audioCTX, setAudioCTX] = useState(null);
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    setAudioCTX(ctx)
  }, [])
  const play = () => {
    const beatsPerMilli = (((60 / tempo)) * 1000);
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
    }, beatsPerMilli);

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

  const updateGrid = (newGridLength) => {
    stop();
    let newNoteRows = [];
    for (let i = 0; i < newGridLength; i++) {
      const row = noteRows[i] ? noteRows[i] : { active: false };
      newNoteRows.push(row);
    }
    setNoteRows(newNoteRows);
  }

  return (
    <>
      <div className="controls-left">
        <div className="control-group">
          <label htmlFor="tempo">BPM: <b>{tempo}</b></label>
          <input
            type="range"
            min="1"
            max="500"
            className="slider"
            value={tempo}
            onChange={(e) => setTempo(e.currentTarget.value)} />
        </div>
        <div className="control-group">
          <label htmlFor="tempo">Grid Size: <b>{noteRows.length}</b></label>
          <input
            type="range"
            min="8"
            max="32"
            className="slider"
            value={noteRows.length}
            onChange={(e) => updateGrid(e.currentTarget.value)} />
        </div>
      </div>
      <div className="notegrid-wrapper">
        <div className="notegrid">
          {noteRows.map((row, i) => {
            return (
              <NoteRow {...row} index={i} key={`noterow-${i}`} audioCTX={audioCTX} />
            )
          })}
        </div>
        <div className="controls">
          <button onClick={play}>Play</button>
          <button onClick={stop}>Stop</button>
          <button onClick={clear}>Clear</button>
        </div>
      </div>
      <div className="controls-right">
        <p>Right Controls</p>
      </div>
    </>
  )
}

export default NoteGrid;