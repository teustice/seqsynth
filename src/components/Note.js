import { useState } from "react";
function Note({ note }) {
  const [active, setActive] = useState(false);

  return (
    <div className={`note ${active ? 'note--active' : ''}`} onClick={() => setActive(!active)}>
      {/* {note} */}
    </div>
  )
}

export default Note;