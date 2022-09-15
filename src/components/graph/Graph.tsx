import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import "./graph.css"
import { commits } from "./data"

interface Commit {
  authorName: string
  date: string
  numberOfCommits: number
}

const Graph = () => {
  const dateSpan = ["2022-09-01", "2022-09-07"]

  const inDateSpan = (commit: Commit) => {
    const commitDate = new Date(commit.date).getDate()
    const startDate = new Date(dateSpan[0]).getDate()
    const endDate = new Date(dateSpan[1]).getDate()
    return commitDate >= startDate && commitDate <= endDate
  }

  const getGraphData = () => {
    const data: any = []
    const filteredCommits = commits.filter((c) => inDateSpan(c))
    filteredCommits.forEach((commit: Commit) => {
      const date = new Date(commit.date)
      const day = date.getDate().toString()
      const month = date.getMonth().toString()
      const formattedDate = day + "/" + month

      const datapointIdx = data.findIndex((d: any) => d.name === formattedDate)

      // hvis datoen allerede er lagt til -> legg til nøkkel til objekt
      if (datapointIdx !== -1) {
        const datapoint = data[datapointIdx]
        data[datapointIdx] = {
          ...datapoint,
          [commit.authorName]: commit.numberOfCommits,
        }
      } else {
        data.push({
          name: formattedDate,
          [commit.authorName]: commit.numberOfCommits,
        })
      }
    })
    return data
  }

  const getUsers = () => {
    const users = Array.from(
      new Set(commits.map((commit: Commit) => commit.authorName))
    )
    return users
  }

  const users: any = getUsers()

  const strokeColors = ["#8884d8", "green", "red", "yellow", "blue"]

  return (
    <div className="chart-container">
      <h1>Commits</h1>
      <LineChart width={800} height={500} data={getGraphData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {users.map((user: any, userIdx: number) => (
          <Line
            key={userIdx}
            type="monotone"
            dataKey={user}
            stroke={strokeColors[userIdx]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </div>
  )
}

export default Graph
