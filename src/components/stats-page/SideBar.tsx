import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FilterOptionsContext } from ".";
import { Member } from "../../entities/member";
import {
  getRepoInformation,
  saveFilterInformation,
} from "../../services/getRepoInformation";
import { getAllMembers } from "../../services/gitlabService";
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
    if (evt.target.checked) {
      filterOptions.selectedUsers.add(evt.target.value);
    } else {
      filterOptions.selectedUsers.delete(evt.target.value);
    }
    setFilterOptions({
      ...filterOptions,
      selectedUsers: new Set(filterOptions.selectedUsers),
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
                checked={filterOptions.selectedUsers.has(person.name)}
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
