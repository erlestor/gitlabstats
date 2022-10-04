import axios from "axios"
import {
  getRepoInformation,
  RepoInformation,
} from "../services/getRepoInformation"
import { Commit } from "../entities/commit"
import { Member } from "../entities/member"
import { Issue } from "../entities/issue"
import { stripObject } from "./stripObject"

const baselineUrl = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/"

async function requestGitlab<T>(
  path: string,
  searchParams?: Map<string, any>,
  token?: string
) {
  const url = new URL(path, baselineUrl)
  if (searchParams) {
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value)
    })
  }
  return await axios
    .get(url.toString(), {
      headers: {
        Authorization: `Bearer ${token ?? getRepoInformation().token}`,
      },
    })
    .then((response) => {
      if (!response.status.toString().startsWith("2")) {
        throw new Error("Request with path: " + path + " failed")
      }
      return response.data as T
    })
}

export const getAllMembers = async (id: number): Promise<Member[]> => {
  return requestGitlab<Member[]>(`${id}/members/all`).then((members) => {
    return members.map((m) =>
      stripObject<Member>(m, ["id", "username", "name"])
    )
  })
}

/* Formats the data from the commit API call to be compatible with the graph
* Parameters: the data to format
* Returns an array with the data.
*/
const dataToGraphCommits = (data: Commit[]): Commit[] => {
  const users = new Set(data.map((commit: Commit) => commit.author_name))

  const graphCommits: any = []
  users.forEach((user: any) => {
    // get commits for a single user
    const commits = data.filter((commit: Commit) => commit.author_name === user)
    // sort by date ascending
    commits.sort(
      (c1: any, c2: any) =>
        new Date(c1.created_at).getTime() - new Date(c2.created_at).getTime()
    )

    const commitData: any = [] // {authorName, date, numberOfCommits}

    // now count the number of commits on each date in commits
    commits.forEach((commit: Commit) => {
      const date = commit.created_at.substring(0, 10)
      // if date is already added
      const commitsAtDate = commitData.filter(
        (c: any) =>
          new Date(commit.created_at.substring(0, 10)).getTime() ===
          new Date(c.date).getTime()
      )
      if (commitsAtDate.length > 0) {
        commitsAtDate[0].numberOfCommits += 1
      } else {
        commitData.push({ authorName: user, date: date, numberOfCommits: 1 })
      }
    })
    graphCommits.push(commitData)
  })

  return graphCommits
}

/*Get the commits. Can be filtered by dates.
* Have to pass in undefined for startdate to get correct end date
* Parameters: the project ID as a number
* The start date and end dates as string. 
* These are optional.
* Return an array of commits formated by dataToGraphCommits
* Throws an error if the status in not 200
*/
export const getCommits = async (
  projectId: number,
  since?: string,
  until?: string
): Promise<Commit[]> => {
  const path = `${projectId}/repository/commits?per_page=9999`
  const searchParams = new Map<string, any>()
  if (since) {
    searchParams.set("since", since)
  }
  if (until) {
    searchParams.set("until", until)
  }
  return requestGitlab<Commit[]>(path, searchParams).then((commits) => {
    const data = commits.map((commit: Commit) =>
      stripObject(commit, ["author_name", "created_at"])
    )
    return dataToGraphCommits(data)
  })
}

/* Formats the data from the issues API call to be compatible with the graph
* Parameters: the data to format
* Returns an array with the data.
*/
const dataToGraphIssues = (data: any) => {
  let users = data.map((issue: Issue) => issue.author.name)
  users = new Set(users)
  users = [...users]
  // users are now all the unique author names that have created an issue

  const graphIssues: any = []
  users.forEach((user: any) => {
    // get commits for a single user
    const issues = data.filter((issue: Issue) => issue.author.name === user)
    // sort by date ascending
    issues.sort(
      (i1: any, i2: any) =>
        new Date(i1.created_at).getTime() - new Date(i2.created_at).getTime()
    )

    const issueData: any = [] // {authorName, date, numberOfCommits}

    // now count the number of commits on each date in commits
    issues.forEach((issue: Issue) => {
      const date = issue.created_at.substring(0, 10)
      // if date is already added
      const issuesAtDate = issueData.filter(
        (i: any) =>
          new Date(issue.created_at.substring(0, 10)).getTime() ===
          new Date(i.date).getTime()
      )
      if (issuesAtDate.length > 0) {
        issuesAtDate[0].numberOfIssues += 1
      } else {
        issueData.push({ authorName: user, date: date, numberOfIssues: 1 })
      }
    })
    graphIssues.push(issueData)
  })

  return graphIssues
}


/*Get the issues. Can filter by a start date
* Parameters: the project ID as a number
* Optional start date as a string. 
* Return an array of issues returned by dataToGraphIssues
* Throws an error if the status in not 200
*/
export const getIssues = async (
  projectId: number,
  createdAfter?: string
): Promise<Issue[]> => {
  const path = `${projectId}/issues`
  const searchParams = new Map<string, any>()
  searchParams.set("per_page", 9999)
  if (createdAfter) {
    searchParams.set("created_after", createdAfter)
  }
  return requestGitlab<Issue[]>(path, searchParams).then((issues) => {
    const data = issues.map((e) => {
      e.author = stripObject(e.author, ["name", "username"])
      const data = stripObject<Issue>(e, ["author", "created_at"])
      return data
    })
    return dataToGraphIssues(data)
  })
}

/* Used to validate if the repo information inputed by the user is valid.
* Parameters: the repo information
* return: True if the status is 200.
* Throws an error if it is not 200 or if the input is empty.
*/
export const validateRepoInformation = async (
  repoInformation: RepoInformation
): Promise<void> => {
  if (!repoInformation.projectId || !repoInformation.token) {
    throw Error("No repo information")
  }

  return requestGitlab(
    repoInformation.projectId.toString(),
    undefined,
    repoInformation.token
  )
}
