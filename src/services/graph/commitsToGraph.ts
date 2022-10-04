import { getDatesInRange, getDateSpan, getFormattedDate } from "./dates"

interface Commit {
  authorName: string
  date: string
  numberOfCommits: number
}

interface Datapoint {
  name: string
  [key: string]: any
}

// given a timeFrame, eg. "week", and the users that should be shown
// returns a list of datapoints for the graph where all users have 0 commits
// eg.  [{name: "2022-04-10", bruker1: 0, bruker2: 0}]
const getDatesAsData = (
  timeFrame: string,
  selectedUsers: Set<string>
): Datapoint[] => {
  const dateSpan = getDateSpan(timeFrame)
  const datesInRange = getDatesInRange(timeFrame, dateSpan[0], dateSpan[1])
  const data: Datapoint[] = []

  datesInRange.forEach((date) => {
    const formattedDate = getFormattedDate(timeFrame, date)
    let datapoint = { name: formattedDate }
    selectedUsers.forEach((user) => {
      datapoint = {
        ...datapoint,
        [user]: 0,
      }
    })
    data.push(datapoint)
  })
  return data
}

// Checks if a commit is created inside the timeframe given. Eg. is it in the last week
const inDateSpan = (timeFrame: string, commit: Commit) => {
  const dateSpan = getDateSpan(timeFrame)
  const startDate = dateSpan[0]
  const endDate = dateSpan[1]

  const commitDate = new Date(commit.date)
  return commitDate >= startDate && commitDate <= endDate
}

// Takes in commits from api. Commits contains a list for user;
// where each object is a certain date and how many commits that user has at that date
// eg. [[{authorName, createdAt, numberOfCommits}]]'

// Returns data that the 'recharts' graph can take in
// data needs to be a list with a object for each date that needs to be shown
// eg. [{name: "2022-04-10", bruker1: 17, bruker2: 8}]
export const getGraphData = (
  timeFrame: string,
  selectedUsers: Set<string>,
  commits: Commit[][]
): Datapoint[] => {
  // data is now a list with all the dates/months and the user values for each month set to 0
  const data = getDatesAsData(timeFrame, selectedUsers)

  let joinedCommits: Commit[] = []
  commits.forEach((commitList: any) => {
    joinedCommits = joinedCommits.concat(commitList)
  })

  const filteredCommits = joinedCommits.filter(
    (commit) =>
      inDateSpan(timeFrame, commit) &&
      (selectedUsers.has(commit.authorName) || selectedUsers.size === 0)
  )

  filteredCommits.forEach((commit) => {
    const date = new Date(commit.date)
    const formattedDate = getFormattedDate(timeFrame, date)

    const datapointIdx = data.findIndex((d) => d.name === formattedDate)
    data[datapointIdx] = {
      ...data[datapointIdx],
      [commit.authorName]:
        data[datapointIdx][commit.authorName] + commit.numberOfCommits,
    }
  })

  return data
}
