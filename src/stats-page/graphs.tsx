import { useContext } from "react"
import { FilterOptionsContext } from "."
import CommitsGraph from "../graph/CommitsGraph"
import IssuesGraph from "../graph/IssuesGraph"

export default function Graphs() {
  const { filterOptions } = useContext(FilterOptionsContext)!

  const getTimeFrame = () => {
    const selectedTimeFrame = filterOptions.selectedTimeFrame
    return selectedTimeFrame.split(" ")[1]
  }

  return (
    <>
      <CommitsGraph selectedUsers={filterOptions.selectedUsers} timeFrame={getTimeFrame()} />
      <IssuesGraph selectedUsers={filterOptions.selectedUsers} timeFrame={getTimeFrame()} />
    </>
  )
}
