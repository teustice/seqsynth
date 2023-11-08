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
  const [isPlaying, setIsPlaying] = useState(false);
  const [playLoop, setPlayLoop] = useState(null);
  const [clearing, setClearing] = useState(false);
  const [tempo, setTempo] = useState('120');
  const [audioCTX, setAudioCTX] = useState(null);
  const [waveshape, setWaveshape] = useState('sine');

  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    setAudioCTX(ctx)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      stop();
      return;
    };
    let activeIndex = 0;
    if (playLoop) {
      clearTimeout(playLoop);
      activeIndex = 0;
    }
    const beatsPerMilli = (60000 / tempo) / 4; //get 16th notes
    console.log(beatsPerMilli);

    const activateRow = () => {
      if (activeIndex === noteRows.length) {
        activeIndex = 0;
      }
      const cloneNoteRows = [...noteRows];
      cloneNoteRows.forEach((row, i) => {
        row.active = (i === activeIndex);
      })
      setNoteRows(cloneNoteRows);
      activeIndex++

      const playloop = setTimeout(() => {
        activateRow();
      }, beatsPerMilli)

      setPlayLoop(playloop);
    }

    activateRow();

    // setPlayLoop(loop);
  }, [isPlaying, tempo])

  const stop = () => {
    setIsPlaying(false);
    clearTimeout(playLoop);
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
          <label htmlFor="tempo"><b>BPM:</b> {tempo}</label>
          <input
            type="range"
            min="1"
            max="300"
            className="slider"
            value={tempo}
            onChange={(e) => {
              setTempo(e.currentTarget.value);
              stop();
            }} />
        </div>
        <div className="control-group">
          <label htmlFor="tempo"><b>Grid Size:</b> {noteRows.length}</label>
          <input
            type="range"
            min="8"
            max="32"
            className="slider"
            value={noteRows.length}
            onChange={(e) => updateGrid(e.currentTarget.value)} />
        </div>
        <div className="control-group">
          <strong>Shape</strong>
          <div className="radio-list">
            {['sine', 'square', 'triangle', 'sawtooth'].map((shape, i) => {
              return (
                <div className="radio-group" key={`shape-${i}`}>
                  <div
                    className={`toggle ${waveshape === shape ? 'active' : ''}`}
                    onClick={() => setWaveshape(shape)}
                  >
                    <img src={process.env.PUBLIC_URL + `/${shape}.png`} alt="waveform" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="notegrid-wrapper">
        <div className="notegrid">
          {noteRows.map((row, i) => {
            return (
              <NoteRow {...row}
                index={i}
                key={`noterow-${i}`}
                audioCTX={audioCTX}
                waveshape={waveshape}
              />
            )
          })}
        </div>
        <div className="controls">
          <button onClick={() => setIsPlaying(true)}>Play</button>
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