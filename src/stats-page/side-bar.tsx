import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FilterOptionsContext } from ".";
import {
  getRepoInformation,
  saveFilterInformation,
} from "../authentication/getRepoInformation";
import { getAllMembers, Member } from "../services/gitlabService";
import styles from "./side-bar.module.css";

export function SideBar() {
  const [members, setMembers] = useState<Member[] | null>(null);
  useEffect(() => {
    getAllMembers(getRepoInformation().projectId).then((members) =>
      setMembers(members)
    );
  }, []);

  const { filterOptions, setFilterOptions, timeFrames } =
    useContext(FilterOptionsContext)!;

  useEffect(() => {
    saveFilterInformation(filterOptions);
  }, [filterOptions]);

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
      {members == null ? (
        <p>Loading ...</p>
      ) : (
        <>
          <h3>Time frame</h3>
          {timeFrames.map((timeFrame) => (
            <div key={timeFrame}>
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
          {members.map((person) => (
            <div key={person.id}>
              <input
                checked={filterOptions.persons[person.name]}
                onChange={selectPersonChange}
                type="checkbox"
                value={person.name}
              />
              <label>{person.name}</label>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
