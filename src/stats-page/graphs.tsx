import { useContext } from "react"
import { FilterOptionsContext } from "."
import CommitsGraph from "../components/graph/CommitsGraph"
import IssuesGraph from "../components/graph/IssuesGraph"

export default function Graphs() {
  const { filterOptions } = useContext(FilterOptionsContext)!

  const getShowUsers = () => {
    const persons = filterOptions.persons
    const showUsers = []

    for (const [key, value] of Object.entries(persons)) {
      if (value) showUsers.push(key)
    }

    return showUsers
  }

  const getTimeFrame = () => {
    const selectedTimeFrame = filterOptions.selectedTimeFrame
    return selectedTimeFrame.split(" ")[1]
  }

  return (
    <>
      <p style={{ maxWidth: "600px" }}>
        Timeframe: {filterOptions.selectedTimeFrame} | selected persons:{" "}
        {Object.keys(filterOptions.persons)
          .reduce((acc: string[], cur) => {
            if (filterOptions.persons[cur]) {
              acc.push(cur)
            }
            return acc
          }, [])
          .join(", ")}
      </p>
      <CommitsGraph showUsers={getShowUsers()} timeFrame={getTimeFrame()} />
      <IssuesGraph showUsers={getShowUsers()} timeFrame={getTimeFrame()} />
    </>
  )
}
