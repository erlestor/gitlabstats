import { ChangeEvent, useState } from "react";
import styles from "./side-bar.module.css";

export function SideBar() {
  const personsArray = ["Magnus", "Erik", "Erlend", "Sondre"];
  const p: { [key: string]: boolean } = {};
  for (const person of personsArray) {
    p[person] = true;
  }
  const timeFrames = ["Last week", "Last month", "Last year"];

  const [persons, setPersons] = useState(p);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0]);

  function selectPersonChange(evt: ChangeEvent<HTMLInputElement>) {
    setPersons({ ...persons, [evt.target.value]: evt.target.checked });
  } 

  return (
    <div className={styles.sideBar}>
      <h3>Persons</h3>
      {personsArray.map((person) => (
        <div key={person}>
          <input checked={persons[person]} onChange={selectPersonChange} type="checkbox" value={person} />
          <label>{person}</label>
        </div>
      ))}
      <h3>Time frame</h3>
      {timeFrames.map((timeFrame) => (
        <div key={timeFrame}>
          <input
            checked={timeFrame == selectedTimeFrame}
            onChange={() => setSelectedTimeFrame(timeFrame)}
            type="radio"
            value={timeFrame}
          />
          <label>{timeFrame}</label>
        </div>
      ))}
    </div>
  );
}
