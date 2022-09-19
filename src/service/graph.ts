import { commits } from "./data"

interface Commit {
  authorName: string
  date: string
  numberOfCommits: number
}

interface Datapoint {
  name: string
  [key: string]: number | string
}

const getDateSpan = (timeFrame: string): Date[] => {
  const endDate = new Date()
  if (timeFrame === "week") {
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 7
    )
    return [startDate, endDate]
  }
  if (timeFrame === "month") {
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth() - 1,
      endDate.getDate()
    )
    return [startDate, endDate]
  }
  if (timeFrame === "year") {
    const startDate = new Date(
      endDate.getFullYear() - 1,
      endDate.getMonth(),
      endDate.getDate()
    )
    return [startDate, endDate]
  }
  return []
}

const getDatesInRange = (startDate: Date, endDate: Date) => {
  const date = new Date(startDate.getTime())
  const dates = []
  while (date <= endDate) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return dates
}

const getFormattedDate = (date: Date) => {
  const day = date.getDate().toString()
  const month = (date.getMonth() + 1).toString()
  // const year = date.getFullYear().toString()
  return day + "/" + month
}

const addDatesAsData = (
  timeFrame: string,
  showUsers: string[],
  data: Datapoint[]
) => {
  const dateSpan = getDateSpan(timeFrame)
  const datesInRange = getDatesInRange(dateSpan[0], dateSpan[1])
  datesInRange.forEach((date) => {
    const formattedDate = getFormattedDate(date)
    let datapoint = { name: formattedDate }
    showUsers.forEach((user) => {
      datapoint = {
        ...datapoint,
        [user]: 0,
      }
    })
    data.push(datapoint)
  })
}

const inDateSpan = (timeFrame: string, commit: Commit) => {
  const dateSpan = getDateSpan(timeFrame)
  const commitDate = new Date(commit.date)
  const startDate = dateSpan[0]
  const endDate = dateSpan[1]
  return commitDate >= startDate && commitDate <= endDate
}

export const getGraphData = (timeFrame: string, showUsers: string[]) => {
  const data: Datapoint[] = []
  addDatesAsData(timeFrame, showUsers, data)
  const filteredCommits = commits.filter((commit) =>
    inDateSpan(timeFrame, commit)
  )

  filteredCommits.forEach((commit) => {
    const date = new Date(commit.date)
    const formattedDate = getFormattedDate(date)
    const datapointIdx = data.findIndex((d) => d.name === formattedDate)
    data[datapointIdx] = {
      ...data[datapointIdx],
      [commit.authorName]: commit.numberOfCommits,
    }
  })

  return data
}
