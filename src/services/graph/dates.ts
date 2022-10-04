import { Datapoint } from "./issuesToGraph"

// returns the start and end date of a given timeFrame
export const getDateSpan = (timeFrame: string): Date[] => {
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

// returns the start and end date of a given timeFrame
// eg. the first and last date of a week
export const getDatesInRange = (
  timeFrame: string,
  startDate: Date,
  endDate: Date
) => {
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

// given at Date object
// returns a formatted string in the form "7/9"
// in the format that the graph will have on its x-axis
export const getFormattedDate = (timeFrame: string, date: Date) => {
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

// given a timeFrame, eg. "week", and the users that should be shown
// returns a list of datapoints for the graph where all users have 0 commits
// eg.  [{name: "2022-04-10", bruker1: 0, bruker2: 0}]
export const getDatesAsData = (
  timeFrame: string,
  showUsers: Set<string>
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
