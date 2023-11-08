import { useEffect, useState } from "react";
function Note({ audioCTX, note, playing, waveshape }) {
  const [makingNoise, setMakingNoise] = useState(false);
  const [active, setActive] = useState(false);
  const [gainNode, setGainNode] = useState(false);
  const [oscillator, setOscillator] = useState(false);

  const TONEREF = {
    C: [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01],
    Db: [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
    D: [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
    Eb: [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
    E: [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
    F: [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
    Gb: [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96],
    G: [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96],
    Ab: [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44],
    A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0],
    Bb: [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
    B: [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07],
  }

  useEffect(() => {
    if(!audioCTX) return;

    const gainNode = audioCTX.createGain()
    gainNode.gain.value = .1
    gainNode.connect(audioCTX.destination)

    const oscillator = audioCTX.createOscillator()
    oscillator.type = waveshape;
    oscillator.frequency.value = note;
    oscillator.start();
    setOscillator(oscillator);
    setGainNode(gainNode);
  }, [audioCTX])

  useEffect(() => {
    if(oscillator) {
      oscillator.type = waveshape;
    }
  }, [waveshape])

  useEffect(() => {
    if(!audioCTX) return;

    if (active && playing) {
      if (oscillator) {
        audioCTX.resume();
        console.log(oscillator);
        oscillator.connect(gainNode)
        gainNode.gain.setTargetAtTime(.1, audioCTX.currentTime, 0.015);
        setMakingNoise(true);
      }
    } else {
      if (oscillator && makingNoise) {
        //prevent click
        console.log('stopping');
        gainNode.gain.setTargetAtTime(0.0001, audioCTX.currentTime, 0.015);
        setTimeout(() => {
          oscillator.disconnect(gainNode)
          setMakingNoise(false);
        }, 50);
      }
    }
  }, [playing, audioCTX])

  return (
    <div className={`note ${active ? 'note--active' : ''}`} onClick={() => setActive(!active)}>
      {/* {note} */}
    </div>
  )
}

export default Note;