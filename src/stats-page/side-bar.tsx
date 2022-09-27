import { ChangeEvent, useContext } from "react";
import { FilterOptionsContext } from ".";
import styles from "./side-bar.module.css";

export function SideBar() {
  const { filterOptions, setFilterOptions, timeFrames } =
    useContext(FilterOptionsContext)!;

  function selectPersonChange(evt: ChangeEvent<HTMLInputElement>) {
    filterOptions.persons[evt.target.value] = evt.target.checked;
    setFilterOptions({
      ...filterOptions,
      persons: {
        ...filterOptions.persons,
        [evt.target.value]: evt.target.checked,
      },
    });
  }

  function setSelectedTimeFrame(timeframe: string) {
    setFilterOptions({
      ...filterOptions,
      selectedTimeFrame: timeframe,
    });
  }

  return (
    <div className={styles.sideBar}>
      <h3>Time frame</h3>
      {timeFrames.map((timeFrame) => (
        <div className={styles.inputWrapper} key={timeFrame}>
          <input
            checked={timeFrame === filterOptions.selectedTimeFrame}
            onChange={() => setSelectedTimeFrame(timeFrame)}
            type="radio"
            value={timeFrame}
            />
          <label>{timeFrame}</label>
        </div>
      ))}
      <h3>Persons</h3>
      {Object.keys(filterOptions.persons).map((person) => (
        <div className={styles.inputWrapper} key={person}>
          <input
            checked={filterOptions.persons[person]}
            onChange={selectPersonChange}
            type="checkbox"
            value={person}
          />
          <label>{person}</label>
        </div>
      ))}
    </div>
  );
}
