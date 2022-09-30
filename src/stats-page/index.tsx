import { createContext, useState } from "react"
import Graphs from "./graphs"
import { FilterOptions } from "./IFilterOptions"
import styles from "./index.module.css"
import { SideBar } from "./side-bar"

export const FilterOptionsContext = createContext<{
  filterOptions: FilterOptions
  setFilterOptions: (filterOptions: FilterOptions) => void
  timeFrames: string[]
} | null>(null)

export default function StatsPage() {
  const timeFrames = ["Last week", "Last month", "Last year"]

  const [filterOptions, setFilterOptions] = useState<FilterOptions>(() => {
    const sessionStorage = window.sessionStorage.getItem("filterOptions")

    if (sessionStorage) return JSON.parse(sessionStorage)
    return { persons: {}, selectedTimeFrame: timeFrames[0] }
  })

  const [showFilterOptionsFullScreen, setShowFilterOptionsFullScreen] =
    useState(false)

  return (
    <FilterOptionsContext.Provider
      value={{
        filterOptions,
        setFilterOptions,
        timeFrames,
      }}
    >
      <div className="flex">
        <section
          className={
            styles.sideBar +
            (showFilterOptionsFullScreen ? " " + styles.filterFullscreen : "")
          }
        >
          <button
            className={styles.setFilterBtn}
            onClick={() => {
              setShowFilterOptionsFullScreen(false)
            }}
          >
            Set filter
          </button>
          <SideBar />
        </section>
        {!showFilterOptionsFullScreen && (
          <div className={styles.scrollWrapper}>
            <main className={styles.main}>
              {/* Button for filtering options on small screens */}
              <button
                className={styles.filterOptionsBtn}
                onClick={() =>
                  setShowFilterOptionsFullScreen(!showFilterOptionsFullScreen)
                }
              >
                Filter
              </button>
              <Graphs />
            </main>
          </div>
        )}
      </div>
    </FilterOptionsContext.Provider>
  )
}
