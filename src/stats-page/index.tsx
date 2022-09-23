import { SideBar } from "./side-bar";
import styles from "./index.module.css";
import Graphs from "./graphs";
import { Header } from "../header/header";
import { FilterOptions } from "./IFilterOptions";
import { createContext, useState } from "react";

export const FilterOptionsContext = createContext<{
  filterOptions: FilterOptions;
  setFilterOptions: (filterOptions: FilterOptions) => void;
  timeFrames: string[];
} | null>(null);

export default function StatsPage() {
  const personsArray = ["Magnus", "Erik", "Erlend", "Sondre"];
  const timeFrames = ["Last week", "Last month", "Last year"];

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    persons: {},
    selectedTimeFrame: timeFrames[0],
  });

  return (
    <FilterOptionsContext.Provider value={{
      filterOptions,
      setFilterOptions,
      timeFrames
    }}>
      <Header />
      <div className="flex">
        <SideBar />
        <div className={styles.scrollWrapper}>
          <main className={styles.main}>
            <Graphs />
          </main>
        </div>
      </div>
    </FilterOptionsContext.Provider>
  );
}
