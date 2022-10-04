interface Commit {
  authorName: string
  date: string
  numberOfCommits: number
}

interface Datapoint {
  name: string
  [key: string]: any
}

// returns the start and end date of a given timeFrame
const getDateSpan = (timeFrame: string): Date[] => {
  const endDate = new Date()
  let startDate = new Date()

  let dayOffset = 0
  let monthOffset = 0
  let yearOffset = 0

  if (timeFrame === "week") dayOffset = 6
  if (timeFrame === "month") monthOffset = 1
  if (timeFrame === "year") yearOffset = 1

  startDate = new Date(
    endDate.getFullYear() - yearOffset,
    endDate.getMonth() - monthOffset,
    endDate.getDate() - dayOffset
  )

  return [startDate, endDate]
}

const getDatesInRange = (timeFrame: string, startDate: Date, endDate: Date) => {
  const date = new Date(startDate)
  const dates = []

  while (date <= endDate) {
    dates.push(new Date(date))
    if (timeFrame === "year") date.setMonth(date.getMonth() + 1)
    else date.setDate(date.getDate() + 1)
  }

  if (timeFrame === "year") dates.shift()
  return dates
}

const getFormattedDate = (timeFrame: string, date: Date) => {
  const day = date.getDate().toString()
  const month = date.getMonth() + 1
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  if (timeFrame === "year") return "" + months[month - 1]

  return day + "/" + month.toString()
}

const getDatesAsData = (
  timeFrame: string,
  showUsers: string[]
): Datapoint[] => {
  const dateSpan = getDateSpan(timeFrame)
  const datesInRange = getDatesInRange(timeFrame, dateSpan[0], dateSpan[1])
  const data: Datapoint[] = []

  datesInRange.forEach((date) => {
    const formattedDate = getFormattedDate(timeFrame, date)
    let datapoint = { name: formattedDate }
    showUsers.forEach((user) => {
      datapoint = {
        ...datapoint,
        [user]: 0,
      }
    })
    data.push(datapoint)
  })
  return data
}

const inDateSpan = (timeFrame: string, commit: Commit) => {
  const dateSpan = getDateSpan(timeFrame)
  const startDate = dateSpan[0]
  const endDate = dateSpan[1]

  const commitDate = new Date(commit.date)
  return commitDate >= startDate && commitDate <= endDate
}

export const getGraphData = (
  timeFrame: string,
  showUsers: string[],
  commits: any
): Datapoint[] => {
  // data is now a list with all the dates/months and the user values for each month set to 0
  const data = getDatesAsData(timeFrame, showUsers)

  let joinedCommits: Commit[] = []
  commits.forEach((commitList: any) => {
    joinedCommits = joinedCommits.concat(commitList)
  })

  const filteredCommits = joinedCommits.filter(
    (commit) =>
      inDateSpan(timeFrame, commit) && showUsers.includes(commit.authorName)
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