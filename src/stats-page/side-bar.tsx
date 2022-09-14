import React from "react";
import styles from "./side-bar.module.css";

export function SideBar() {
  const persons = ["Magnus", "Erik", "Erlend", "Sondre"];
  const timeFrames = ["Last week", "Last month", "Last year"];
  return (
    <div className={styles.sideBar}>
      <h3>Persons</h3>
      {persons.map((person) => (
        <div key={person}>
          <input type="checkbox" value={person} />
          <label>{person}</label>
        </div>
      ))}
      <h3>Time frame</h3>
      {timeFrames.map((timeFrame) => (
        <div key={timeFrame}>
          <input type="radio" value={timeFrame} />
          <label>{timeFrame}</label>
        </div>
      ))}
    </div>
  );
}
