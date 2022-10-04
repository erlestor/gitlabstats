import { getDatesAsData, getDateSpan, getFormattedDate } from "./dates"

interface Issue {
  authorName: string
  date: string
  numberOfIssues: number
}

export interface Datapoint {
  name: string
  [key: string]: any
}

// Checks if a commit is created inside the timeframe given. Eg. is it in the last week
const inDateSpan = (timeFrame: string, issue: Issue) => {
  const dateSpan = getDateSpan(timeFrame)
  const startDate = dateSpan[0]
  const endDate = dateSpan[1]

  const issueDate = new Date(issue.date)
  return issueDate >= startDate && issueDate <= endDate
}

// Takes in issues from api. Issues contains a list for user;
// where each object is a certain date and how many issues that user has at that date
// eg. [[{authorName, createdAt, numberOfIssues}]]'

// Returns data that the 'recharts' graph can take in
// data needs to be a list with a object for each date that needs to be shown
// eg. [{name: "2022-04-10", bruker1: 17, bruker2: 8}]
export const getIssueGraphData = (
  timeFrame: string,
  showUsers: string[],
  issues: any
): Datapoint[] => {
  // data is now a list with all the dates/months and the user values for each month set to 0
  const data = getDatesAsData(timeFrame, showUsers)

  let joinedIssues: Issue[] = []
  issues.forEach((issueList: any) => {
    joinedIssues = joinedIssues.concat(issueList)
  })

  const filteredIssues = joinedIssues.filter(
    (issue) =>
      inDateSpan(timeFrame, issue) && showUsers.includes(issue.authorName)
  )

  filteredIssues.forEach((issue) => {
    const date = new Date(issue.date)
    const formattedDate = getFormattedDate(timeFrame, date)

    const datapointIdx = data.findIndex((d) => d.name === formattedDate)
    data[datapointIdx] = {
      ...data[datapointIdx],
      [issue.authorName]:
        data[datapointIdx][issue.authorName] + issue.numberOfIssues,
    }
  })

  return data
}
